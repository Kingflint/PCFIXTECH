# Audit trail

Every admin-initiated mutation is mirrored to a `_audit` subcollection
on the parent document. Entries record:

- `actorEmail`
- `at` (server timestamp)
- `description` (human readable)
- `diff` (shallow object diff produced by `src/utils/diff.ts`)

Audit entries are never deleted in code; cleanup is performed via
manual Firestore tooling as part of GDPR-style deletion requests.