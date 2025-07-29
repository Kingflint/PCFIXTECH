# Secret management

iFixit deliberately ships only *public* keys to the browser:

- Firebase web client config.
- Paystack public key.

There is no server, so no server-side secrets. Operational secrets
(SMTP webhook signing key, etc.) live in the host's secret store and
are not committed.

If you accidentally commit a real secret, rotate it immediately and
follow the recovery checklist in `docs/RUNBOOK.md`.