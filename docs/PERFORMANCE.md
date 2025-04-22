# Performance notes

## Bundle

- Vite + Tailwind v4. The production bundle is heavily tree-shaken.
- Largest deps: `firebase`, `motion`, `date-fns`, `lucide-react`.

## Runtime

- Avoid suspending Firestore listeners in expensive parents; co-locate
  them with the components that need the data.
- Memoise admin charts; recompute totals only when the underlying
  collection changes.

## Profiling

`npm run build && npm run preview` then run Lighthouse against
`http://localhost:4173`.