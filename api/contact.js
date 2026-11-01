const requests = new Map();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

function clientAddress(request) {
  const forwarded = request.headers['x-forwarded-for'];
  return typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : 'unknown';
}

function isAllowed(address) {
  const now = Date.now();
  for (const [key, times] of requests) {
    if (!times.some((time) => now - time < WINDOW_MS)) requests.delete(key);
  }
  if (!requests.has(address) && requests.size >= 10000) return false;
  const known = (requests.get(address) || []).filter((time) => now - time < WINDOW_MS);
  if (known.length >= MAX_REQUESTS) return false;
  known.push(now);
  requests.set(address, known);
  return true;
}

function clean(value, limit) {
  return typeof value === 'string' && value.length <= limit ? value.trim() : '';
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const origin = request.headers.origin;
  const allowedOrigins = ['https://www.vantagetechlabs.com', 'https://vantagetechlabs.com'];
  if (origin && !allowedOrigins.includes(origin)) return response.status(403).json({ error: 'Forbidden' });
  if (!isAllowed(clientAddress(request))) return response.status(429).json({ error: 'Too many requests' });

  if (!request.headers['content-type']?.includes('application/json')) {
    return response.status(415).json({ error: 'Unsupported content type' });
  }
  const body = request.body;
  if (!body || typeof body !== 'object' || Array.isArray(body)) return response.status(400).json({ error: 'Invalid submission' });
  const limits = { name: 100, email: 160, company: 160, country: 100, projectType: 40, description: 3000, website: 200 };
  if (Object.entries(limits).some(([key, limit]) => body[key] !== undefined && (typeof body[key] !== 'string' || body[key].length > limit))) {
    return response.status(400).json({ error: 'Invalid submission' });
  }
  const name = clean(body.name, 100);
  const email = clean(body.email, 160);
  const company = clean(body.company, 160);
  const country = clean(body.country, 100);
  const projectType = clean(body.projectType, 40);
  const description = clean(body.description, 3_000);
  const honeypot = clean(body.website, 200);
  const allowedTypes = ['software', 'hardware', 'integrated', 'unsure', 'digital-workplace'];

  if (honeypot) return response.status(400).json({ error: 'Invalid submission' });
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || /[\r\n]/.test(name + email) || !description || !allowedTypes.includes(projectType)) {
    return response.status(400).json({ error: 'Invalid submission' });
  }
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL || !process.env.CONTACT_FROM_EMAIL) {
    return response.status(503).json({ error: 'Contact delivery is not configured' });
  }

  const safe = (value) => value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[character]));
  const html = `<h2>New Vantage Tech Labs inquiry</h2><p><strong>Name:</strong> ${safe(name)}</p><p><strong>Work email:</strong> ${safe(email)}</p><p><strong>Company:</strong> ${safe(company || 'Not provided')}</p><p><strong>Country / market:</strong> ${safe(country || 'Not provided')}</p><p><strong>Project type:</strong> ${safe(projectType)}</p><p><strong>Project description:</strong><br>${safe(description).replace(/\n/g, '<br>')}</p>`;

  try {
    const delivery = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: process.env.CONTACT_FROM_EMAIL, to: [process.env.CONTACT_TO_EMAIL], reply_to: email, subject: `Project inquiry from ${name}`, html })
    });
    if (!delivery.ok) return response.status(502).json({ error: 'Delivery failed' });
    return response.status(200).json({ ok: true });
  } catch {
    return response.status(502).json({ error: 'Delivery failed' });
  }
}
