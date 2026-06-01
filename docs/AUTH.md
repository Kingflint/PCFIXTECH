# Authentication

PCFIXTECH uses Firebase Authentication with two providers:

- Email + password (verified email required).
- Google.

## Verified-email gate

If a user signs in with email/password and `emailVerified === false`,
we sign them out immediately. Google accounts are exempt because they
are considered verified by Google. The seeded admin email
(`admin@hairsparadise.com`) bypasses the check during bootstrap.

## Session

There is no separate session store; we trust Firebase Auth's
`onAuthStateChanged` listener.

## Sign-out

`signOut(auth)` clears local state and unsubscribes Firestore listeners
in the corresponding `useEffect` cleanups.