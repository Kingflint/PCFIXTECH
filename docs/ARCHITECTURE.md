# Architecture

PCFIXTECH is a single-page React app backed entirely by Firebase
(Authentication + Firestore). There is no custom backend.

## Layers

- `src/app/` — UI components and the top-level App shell.
- `src/data/` — pure-data modules (constants, device catalogue, LGAs).
- `src/firebase/` — Firebase client initialisation.
- `src/utils/` — pure helper functions, fully unit-testable.
- `src/types/` — shared TypeScript types.

## Firestore collections

- `ifixit_users` — user profiles, indexed by Auth UID.
- `ifixit_settings/main` — singleton document with site config.
- `ifixit_orders` — repair orders.
- `ifixit_store_orders` — store purchases.
- `ifixit_store_products` — store product catalogue.

## Auth model

Email/password accounts must verify their email before access is granted.
Google sign-in is treated as pre-verified. The first user becomes admin
when no settings document exists.