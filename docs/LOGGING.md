# Logging

PCFIXTECH logs sparingly to the browser console:

- `info` for state-machine transitions.
- `warn` for soft failures (offline, auth retry).
- `error` for unexpected exceptions.

For production, console output is captured by the host (Firebase
Hosting -> Cloud Logging).