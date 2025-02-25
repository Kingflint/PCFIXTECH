# Admin dashboard

Available to any account whose email is in
`ifixit_settings/main.adminEmails`. The first user to sign in on a fresh
deployment is automatically added.

## Tabs

- **Overview** - daily/weekly counts.
- **Repairs** - manage in-flight repair orders.
- **Store** - manage products and store orders.
- **Settings** - business info and feature flags.

## Status transitions

Use the Repairs tab to advance an order. The dashboard guards against
illegal transitions using the helpers in `src/utils/orderFlow.ts`.

## Overstay billing

Repairs sit in the shop after `Ready for Return/Pickup`. After
`overstayGraceDays`, an extra `overstayFeePerDay` is added per day. The
amount preview lives next to each row.