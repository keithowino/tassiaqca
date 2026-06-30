# Authentication Roadmap

Here's the sequence we'll follow:

## Milestone 1 — Basic Authentication

- ✅ Register
- ✅ Login
- ⬜ Logout
- ⬜ Refresh Token

## Milestone 2 — Authentication Middleware

- JWT verification
- Current user injection
- Protected routes

## Milestone 3 — Authorization

- Roles
- Permissions
- Business membership checks

## Milestone 4 — Account Security

- Email verification
- Forgot password
- Reset password
- Change password
- Token rotation
- Session revocation

Notice how each milestone builds on the previous one.

---

---

---

# Why a Session Model is Better

Instead of this:

```bash
User
    ├── ...
    ├── refreshToken
    └── tokenVersion
```

We'll have:

```bash
User
    ├── ...
    └── Sessions (1 → N)
```

```bash
Session
    ├── user
    ├── refreshTokenHash
    ├── expiresAt
    ├── lastActivityAt
    ├── device
    ├── browser
    ├── platform
    ├── ipAddress
    ├── isRevoked
    └── revokedAt
```

Immediately we gain:

- ✅ Multiple devices
- ✅ Logout one device
- ✅ Logout everywhere
- ✅ Session history
- ✅ Security dashboard
- ✅ Refresh token rotation
- ✅ Future MFA support
- ✅ Device trust

---

---

---
