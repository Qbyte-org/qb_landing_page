# Waitlist connectivity check — 30 September 2026

Checked at approximately 19:39–19:43 UTC from the local site on port 3001.
This is the current result; the 23 September report describes an earlier state.

## Finding

The staging API could not be reached over HTTPS from this development machine.
The browser's preflight received no response before the diagnostic timeout,
so the waitlist POST could not proceed. This check does not establish a global
outage or identify whether the cause is the server, reverse proxy, firewall,
load balancer, or a network route affecting this machine.

## Evidence

- Both the main waitlist form and footer form generated requests to the API
  configured by `NEXT_PUBLIC_API_BASE_URL` in `.env`, with `/waitlist` appended.
  The actual compiled browser requests matched the environment setting.
- Sixteen intercepted submissions passed validation, consent, payload,
  duplicate-pending prevention, success/error handling and cooldown checks.
  Responses were mocked locally; no real subscribers were created.
- DNS resolved the configured staging hostname to `187.7.24.132`.
- Four OPTIONS probes, using the local development and website origins,
  failed with `UND_ERR_CONNECT_TIMEOUT` after approximately 10.6–10.9 seconds.
- A separate curl OPTIONS probe timed out after 10 seconds, before TCP or TLS
  connection establishment. It received no HTTP status or response headers.
- An actual browser validation probe with an empty JSON object (no contact
  details or consent) initiated an OPTIONS preflight but received no response
  within 18 seconds. No subscriber data was sent by this probe.
- A control HTTPS request to `example.com` returned HTTP 200 in 1.34 seconds.

These results do not demonstrate a current CORS allow-origin rejection: the
API must become reachable before its CORS response can be assessed.

## Required next step

Check the staging host's public HTTPS listener on port 443, reverse proxy or
load balancer, service health, inbound firewall rules and DNS destination.
Compare connectivity from another network to distinguish an infrastructure
failure from a network-specific routing restriction. Once reachable, check
the POST preflight for the actual origin, `http://localhost:3001`, then perform
a consented end-to-end signup with the backend owner.

The application endpoint and form behavior were left unchanged: changing the
payload, increasing the timeout or adding a frontend proxy would not resolve
the connection failure observed in this check.
