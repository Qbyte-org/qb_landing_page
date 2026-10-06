# Waitlist API diagnostic report

Historical report: these findings describe the checks on 23 September 2026.
See [the later connectivity check](waitlist-connectivity-2026-09-30.md) for the
subsequent investigation; neither report is a live service-status check.

Checked on 23 September 2026, 21:23–21:44 UTC (22:23–22:44 Africa/Lagos), from the local development environment at `http://localhost:3002`.

## Finding

The frontend sends and handles the documented waitlist contract correctly in the checks performed. Two external blockers remain:

1. **The running app calls production, and that host is unreachable from this environment.** Production DNS resolves, but both command-line requests and the browser fail to obtain an HTTP response. The app's 15-second timeout produces the reported “Your request took too long” message.
2. **The documented staging host is reachable, but its CORS configuration blocks this website.** Its preflight returns HTTP 204 without `Access-Control-Allow-Origin`. The browser explicitly rejects that response. Merely changing the frontend URL to staging would therefore still fail until staging CORS is corrected.

These results do not prove a global production outage or identify the exact infrastructure fault. Production routing, its HTTPS listener, firewall/load balancer settings, or a network restriction require investigation by the backend/deployment owner. No backend repository or deployment controls were available in this review.

## What the frontend actually does

The backend developer's supplied Waitlist API document was compared with `src/lib/waitlist.ts`, both forms, their shared hook, and the result modal.

| Contract requirement | Current behavior and verification |
| --- | --- |
| Public `POST /api/v1/waitlist` | Both forms use this exact path, JSON, no authentication header, and `credentials: "omit"`. |
| At least email or Nigerian mobile | Checked locally before any request. Email-only and phone-only submissions both passed browser checks. |
| Optional name/email/phone | Trimmed; empty optional fields omitted from JSON. No empty email is sent for a phone-only submission. |
| Explicit consent | Initially unchecked checkbox links to the Privacy Notice. Submission requires a real checked value and sends `consent: true`. |
| Honeypot | CSS-hidden text input, `tabIndex={-1}`, autocomplete off. Always sent as `website`, normally `""`. |
| Accepted response | Only a documented HTTP 202 with a string message confirms success. The server message is shown and form/consent reset. No membership or “already registered” inference is made. |
| Validation/server errors | Error codes and `requestId` are preserved; the backend message and request reference appear in the modal. Entered fields remain available. |
| Rate limit | HTTP 429 has a separate result and submit cooldown. `Retry-After` accepts seconds or an HTTP date; missing/inaccessible values fall back to 60 seconds. |
| Repeated clicks | Controls disable during submission, with an immediate in-flight guard and coalescing of identical concurrent payloads. No automatic retries. |
| Network failures | A 15-second abort becomes `TIMEOUT`; other rejected fetches become `NETWORK_ERROR`. Neither is presented as success. |

Both `.env` and the **actual requests intercepted from the running browser** use:

```text
NEXT_PUBLIC_API_BASE_URL=https://api.quickbiteltd.org/api/v1
POST https://api.quickbiteltd.org/api/v1/waitlist
```

The inspected browser is therefore not using an old staging URL. `.env.example` and the backend document recommend staging for development; `.env.example` is an example, not the running app's configuration. Next.js embeds public environment values into the browser bundle, so restart development or rebuild the deployed app after changing the URL. See [Next.js environment-variable documentation](https://nextjs.org/docs/app/guides/environment-variables).

No frontend payload or response-handling defect explaining the current outage was reproduced. No API code, environment settings, or form behavior were changed during this diagnosis.

## Live network evidence

All preflights used the actual endpoint and requested `POST` with `Content-Type: application/json`.

| Probe | Result | Timing |
| --- | --- | --- |
| DNS `api.quickbiteltd.org` | A record `100.29.146.223` | Resolved |
| DNS `staging-api.quickbiteltd.org` | A record `187.7.24.132` | Resolved |
| Production OPTIONS, origin `http://localhost:3002` | Connection timed out; no HTTP response, TCP connection or TLS handshake completed | 10.009 s (curl connection deadline) |
| Production GET `/api/v1/waitlist` | Same connection timeout, no HTTP response | 10.011 s |
| Production browser readiness probe | `TimeoutError`, no response before browser abort | 15.002 s |
| Staging OPTIONS, origin `http://localhost:3002` | HTTP 204; **no `Access-Control-Allow-Origin`** | 0.650 s; TLS completed in 0.503 s |
| Staging OPTIONS, origin `https://www.quickbiteltd.org` | HTTP 204; **no `Access-Control-Allow-Origin`** | 0.494 s |
| Staging OPTIONS, origin `https://quickbiteltd.org` | HTTP 204; **no `Access-Control-Allow-Origin`** | 0.483 s |
| Staging GET `/api/v1/waitlist` | HTTP 404 JSON `NOT_FOUND`, “Cannot GET /api/v1/waitlist” | 0.502 s |
| Staging browser readiness probe | Preflight HTTP 204, followed by explicit CORS rejection and `TypeError: Failed to fetch` | 0.538 s |

A GET returning 404 is normal for an endpoint documented only for POST. It establishes that staging responds; it does not establish that its POST business logic or database write works.

Relevant staging preflight headers on this check were:

```http
HTTP/1.1 204 No Content
Access-Control-Allow-Credentials: true
Access-Control-Allow-Headers: Authorization,Content-Type,X-Request-ID
Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS
Access-Control-Expose-Headers: X-Request-ID
Vary: Origin
```

The missing allow-origin header is the blocking defect. `Access-Control-Allow-Credentials` and HTTP 204 do not authorize this origin by themselves. The browser console specifically reported a missing `Access-Control-Allow-Origin` on the preflight. A JSON POST triggers preflight; the browser must approve it before sending the actual submission. See [MDN's CORS documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS).

The exposed-header list also omits `Retry-After`. Once CORS works, the app can still show rate-limit errors, but cannot read the exact server cooldown through this observed policy and will use its 60-second fallback unless actual error responses expose that header separately.

Staging request references, if useful for the backend logs:

- Localhost OPTIONS at 21:23:18 UTC: `c2067660-909d-43e3-9e5d-05f7295768e9`.
- GET at 21:24:56 UTC: `3106f105-f657-4112-ae5c-f24d5cae4a13`.
- WWW-origin OPTIONS at 21:25:53 UTC: `7b6d7130-2193-4e89-99e0-b6487db55cd0`.
- Apex-origin OPTIONS at 21:25:53 UTC: `db961986-3e78-47fc-93bb-3db9d7fa2f30`.

## Checks completed and their limits

- `node --test tests/waitlist.test.cjs`: **15 tests passed**, covering contract handling, validation, optional fields, honeypot, repeat/in-flight behavior, response errors, cooldown parsing, timeout handling, configuration and scroll-lock cleanup.
- Headless Edge against the running app: **10 intercepted POST requests across `/waitlist` and the footer**, with local responses for 202, 400, 429 and network failure. Confirmed actual production URL, required consent/contact validation, email-only and phone-only JSON, pending duplicate prevention, success resets, request references, retained values after failure, cooldown and error recovery. No browser runtime errors occurred in these checks.
- Browser network readiness was checked separately with an empty JSON body `{}` containing no identifier or consent. Production did not answer its preflight; staging's preflight was rejected by CORS. No valid signup was sent to either live API.
- No real subscriber was created. Successful live submission, persistence, repeat acknowledgment and launch-email delivery remain unverified until the external blockers are fixed. Mocked success is evidence of frontend handling only.

The previously shown Fast Refresh messages, unused CSS preload warning and `mailto:` external-handler message do not diagnose a failed API submission. The timeout result and the network/preflight evidence above are the relevant failures.

## Required follow-up

1. **Backend/deployment owner:** investigate production HTTPS reachability to `api.quickbiteltd.org:443` from outside its hosting network, including DNS target, running service/reverse proxy, inbound firewall/security rules and load-balancer health. Retest the exact public URL; no frontend timeout increase can repair an unreachable host.
2. **Backend/deployment owner:** add the actual allowed website origins to `CORS_ORIGINS` on the environment in use, including `http://localhost:3002` for this development setup and the production/preview origins that genuinely serve the website. Verify responses include the matching `Access-Control-Allow-Origin`; allow `POST`/`OPTIONS` and `Content-Type`. Ensure both successful and error responses carry the needed CORS headers. Expose `Retry-After` alongside `X-Request-ID`.
3. **Frontend/deployment configuration:** set `NEXT_PUBLIC_API_BASE_URL` in `.env` to the staging API base, including `/api/v1`, for development as the backend document requests, after staging's CORS policy is repaired. Restart the development server and verify the browser request URL again. Production builds should use a healthy production endpoint configured before building. The local `.env` was preserved during this investigation.
4. **End-to-end verification:** after the above repairs, submit a consented test contact on staging, confirm HTTP 202 in the browser and the persisted record with backend access, then repeat it and confirm the same acknowledgment. Exercise a validation error and a controlled rate-limit response without creating test subscribers in production.

The remaining work is API reachability/CORS configuration and a live end-to-end confirmation, rather than a replacement frontend integration.
