# Public website contact delivery

The public website is static HTML/CSS/JavaScript at the repository root. Vercel
provides the server endpoint at /api/contact. The intranet is a separate
application under intranet/ and is not required to preview this website.

## Preview

Run `python3 -m http.server 4173 --bind 127.0.0.1` at the repository root,
then open http://127.0.0.1:4173/. This previews the layout, language switch,
and simulated temperature demo. A static Python server does not run the
contact endpoint; sending there must not be treated as successful.

## Delivery configuration

In the existing public Vercel project, configure these server-only environment
variables using .env.example as a checklist:

- CONTACT_TO_EMAIL: the recipient supplied privately by the owner.
- CONTACT_FROM_EMAIL: an address authorized by the chosen Resend account.
- RESEND_API_KEY: the account's server-side sending key.

Do not add these values to HTML, browser JavaScript, or public configuration.
The visitor's validated address is used only as Reply-To. The recipient
is fixed by the server environment.

No credentials or sender verification were supplied for this revision.
Production delivery therefore remains unverified. When configuration is
missing, the endpoint returns 503 and the browser retains the form content.
Use an approved staging deployment and recipient to verify actual delivery.

## Abuse controls

The endpoint checks origin, JSON content, field types and lengths, email,
project type, a honeypot, and a bounded in-memory request window. The latter
is per warm function instance, not a shared global limit. In the public
Vercel project's Firewall, add a POST /api/contact rate-limit rule using
the client's IP before opening the form to sustained production traffic.
This does not require DNS, email-record, or domain-association changes.

No production deployment is performed by the local revision workflow.
