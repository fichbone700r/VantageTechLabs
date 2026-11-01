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

## Verification status and next controlled test

This workspace has no public-site delivery credentials available and no
connection to the public Vercel project's environment settings. The intranet's
environment is unrelated and must not be reused. The configured production
recipient and authorized sender could not be inspected or verified here.

After configuring the existing server-only variables, submit exactly one
controlled inquiry with description "Vantage Tech Labs controlled delivery
test" and an owner-controlled Reply-To address. Provider API acceptance
confirms submission only. A provider delivery event confirms delivery to the
receiving mail server; inbox receipt requires a separate mailbox check.
Do not claim these later stages from a successful API response.

The local rate limiter is per function instance. A shared IP rate limit at
the Vercel Firewall remains a deployment configuration step.

## Digital Workplace screenshot

No appropriate product screenshot was found among repository assets.
Keep the existing solution section until a sanitized capture is available.
Useful capture: the banking workspace showing account navigation and a few
transaction rows, using a dedicated demo account with entirely fictitious
names, account numbers, amounts, and documents. Remove profile identities,
credentials, browser chrome, notifications, and customer information.
Confirm the captured workflow exists, label demo data clearly, and export a
readable WebP with a mobile-friendly crop. Do not capture production records.
