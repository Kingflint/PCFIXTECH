# Testing

PCFIXTECH uses Vitest with the JSDOM environment.

```bash
npm test           # one-shot run
npm run test:watch # interactive
npm run test:coverage
```

## Where to put tests

- Pure helpers under `src/utils/` -> `tests/<name>.test.ts`.
- Component smoke tests -> `tests/components/<Name>.test.tsx`.

## Conventions

- Prefer table-driven tests for input validation.
- Avoid Firebase in unit tests; mock the surface area you need.
- Do not assert against generated tracking codes; assert on shape only.