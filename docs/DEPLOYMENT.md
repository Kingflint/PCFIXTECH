# Deployment

## Production build

```bash
npm install
npm run build
```

Static output goes to `dist/`. Any static host works (Firebase Hosting,
Vercel, Netlify).

## Environment

Configure Firebase credentials in `src/firebase/config.ts`. The Paystack
public key is in `src/config/paystack.ts`.

## Smoke check

```bash
npm run preview
```

Open http://localhost:4173 and verify the booking flow loads.