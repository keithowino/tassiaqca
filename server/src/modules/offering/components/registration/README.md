- The important distinction is:

```text
Event → Registration
Course → Enrollment
Booking → Booking
```

Therefore I would not add REGISTRATION to Course merely because a course can have participants. Course already has the more semantically precise ENROLLMENT component.

So the initial registry change should be Event only.

## Dependencies

Registration should have no hard dependency on Scheduling.

An Event may naturally use:

```text
Scheduling
Capacity
Location
Registration
```

but Registration itself should not directly access Scheduling persistence.

Likewise, Registration may eventually interact with Capacity when an actual registration transaction is created, but the configuration component does not need to own capacity.

## Components that may depend on Registration

Later:

```text
Registration Transaction
        ↓
Registration Policy
        ↓
Capacity
Scheduling
Customer
Payment
Notification
```

The eventual registration workflow can consume this configuration without Registration becoming responsible for those domains.

## Frontend consumer

Eventually:

Business OS

```text
Offering
 └── Registration Settings
      ├── Registration enabled
      ├── Confirmation required
      ├── Minimum advance time
      ├── Maximum advance time
      └── Cancellation window
```

And later:

Marketplace

```text
Event
 ↓
Register
 ↓
Registration workflow
 ↓
Confirmation
```

---

| Field                         | Meaning                                                                                        |
| ----------------------------- | ---------------------------------------------------------------------------------------------- |
| `active`                      | Whether registration is currently enabled                                                      |
| `approvalRequired`            | Whether registrations require business approval                                                |
| `maximumRegistrations`        | Maximum number of registrations; `null` means unlimited                                        |
| `registrationDeadlineMinutes` | How long before the relevant Offering event/time registration closes; `null` means no deadline |
