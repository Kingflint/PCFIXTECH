# Contributing to PCFIXTECH

Thanks for your interest in PCFIXTECH! This is a small private project, but PRs and issues are welcome.

## Local setup

```bash
npm install
npm run dev
```

## Branching

- `main` is always deployable.
- Feature branches: `feat/<short-name>`.
- Fix branches: `fix/<short-name>`.

## Commit messages

We follow Conventional Commits:

- `feat:` new feature
- `fix:` bug fix
- `chore:` housekeeping
- `docs:` documentation only
- `refactor:` non-functional code change
- `test:` test changes

## Code style

- TypeScript strict mode.
- 2-space indent, LF line endings (enforced by EditorConfig).
- Run `npm run build` before opening a PR.