# Cleanup plan (2026-Q1)

- [ ] Drop the `repairitinspiration/` design archive (27 MB, unused).
- [ ] Remove the unused custom asset resolver from `vite.config.ts`.
- [ ] Rename the legacy media component folder in the inspiration archive
      before dropping it (so historical references make sense).
- [ ] Stand up Vitest with JSDOM and back-fill tests for the existing
      pure helpers.
- [ ] Add coverage reporting via `@vitest/coverage-v8`.