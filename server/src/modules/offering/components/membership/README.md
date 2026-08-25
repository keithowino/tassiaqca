## Business concept represented

The component represents:

The access policy/configuration attached to a Membership Offering.

It is not the membership itself.

A useful conceptual distinction is:

```text
Offering
   │
   └── Membership Component
           │
           ├── approval policy
           ├── duration
           ├── renewal policy
           └── active state
```

Later:

```text
Customer
   │
   └── Membership
           │
           ├── offering
           ├── activatedAt
           ├── expiresAt
           ├── status
           └── entitlement
```

Those should not be conflated.

## One architectural point to preserve

The Membership component currently models **configuration**, not actual membership subscriptions/instances. Its schema therefore correctly remains centered around:

```text
Offering
   │
   └── OfferingMembership
          ├── active
          ├── approvalRequired
          ├── durationMinutes
          └── renewable
```

Actual customer membership enrollment/activation should be a later domain operation rather than being introduced into this component prematurely. This keeps the current Offering Component architecture consistent with what we established for Booking, Registration, Enrollment, and Instructor.
