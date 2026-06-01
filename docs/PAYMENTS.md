# Payments

PCFIXTECH uses Paystack inline checkout for both repair-fee top-ups and
store purchases.

## Reference format

`ifx_<short-tracking-code>_<unix-seconds>`

## Amount handling

All amounts are stored in Naira but charged in kobo
(`amount * 100`). See `src/utils/paystack.ts > nairaToKobo`.

## Refund flow

Refunds are processed manually through the Paystack dashboard. Update
the order to `cancelled` once the refund has cleared.