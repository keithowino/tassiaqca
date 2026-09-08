## Valid access token

```http
GET {{baseUrl}}/auth/me
Authorization: Bearer {{accessToken}}
```

```js
// Response

{"success":true,"data":{"user":{"id":"6a8ddee34c68ac745fde97dc","firstName":"Keith","lastName":"Owino","email":"designsolutions1629@gmail.com","avatar":{}}}}
```

## Expired access token + valid refresh token

### Step D — Verify refresh directly

```http
POST {{baseUrl}}/auth/refresh
Content-Type: application/json

{
    "refreshToken": "{{refreshToken}}"
}
```

Responded as expected: HTTP/1.1 200 OK

## Expired access token + invalid/revoked refresh token

### Step B — Revoke/invalidate the refresh session

```http
POST {{baseUrl}}/auth/logout
Content-Type: application/json

{
	"refreshToken": "{{refreshToken}}"
}
```

```js
// Response

{"success":true,"message":"Logged out successfully."}
```

### Step C — Simulate expired access token

```http
GET {{baseUrl}}/auth/me
Authorization: Bearer {{accessToken}}
```

```js
// Response

{"success":false,"error":{"code":"UNAUTHORIZED","message":"Authentication session is invalid or expired.","details":null}}
```

### Step D — Attempt refresh with revoked token

```js
// Response

{"success":false,"error":{"code":"UNAUTHORIZED","message":"Invalid refresh token.","details":null}}
```

The rest all passed successfully and or returned the expected responses.

---

So we are currently implementing this stage:

```text
├── STAGE 2 — AUTHENTICATION LIFECYCLE
│   ├── Sign-out
│   ├── Forgot Password
│   ├── Reset Password
│   ├── Email Verification
│   ├── Session lifecycle
│   ├── User profile page
│   └── Auth route behaviour
```

and as per the rest tests above, stage 2A.2 has been verified.

Considering the current state of the codebase, if i am not mistaken the possible natural next step was:

## Stage 2D — Session management UI

```text
Account / Security
       │
       ├── Current session
       ├── Other sessions
       │      ├── Device
       │      ├── Browser
       │      ├── OS
       │      ├── Last activity
       │      └── Revoke
       │
       └── Sign out other sessions
```

As we proceed, if you suspect that there is a process that seems to be incomplete don't hesitate to request for the necessary files for verification.
