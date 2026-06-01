# Environment configuration

## Vite env

PCFIXTECH uses Vite, so client-readable environment variables must be prefixed
with `VITE_`.

| Variable                | Purpose                                  |
|-------------------------|------------------------------------------|
| `VITE_PAYSTACK_KEY`     | Public Paystack key                      |
| `VITE_FIREBASE_API_KEY` | Firebase Auth + Firestore API key        |
| `VITE_ENABLE_STORE`     | Force-enable store mode for QA builds    |

## Local development

Create a `.env.local` in the project root and restart `npm run dev`.

```env
VITE_ENABLE_STORE=true
```

The flag is read via `src/utils/env.ts > envFlag("VITE_ENABLE_STORE")`.