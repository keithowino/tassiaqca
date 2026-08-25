Enrollment and Registration are conceptually related but not identical.

Registration = a participant registers interest/participation in an offering.
Enrollment = a learner is formally enrolled into an educational offering.

This distinction matters because the architecture explicitly separates customer interactions and business-domain responsibilities.

## Offering Types using it

Initially:

```text
COURSE
```

Potential future users:

```text
PROGRAM
WORKSHOP
TRAINING
CLASS
CERTIFICATION
```

## Enrollment requires Registration

An offering cannot have Enrollment enabled unless it supports Registration.

That dependency is already declared by the component registry.

## Business concept

The conceptual model is:

```text
Course
   │
   ├── Registration
   │     └── Can someone register?
   │
   └── Enrollment
         └── Can someone become a learner?
```

This distinction gives us room later to model:

```text
Registration
    ↓
Application
    ↓
Approval
    ↓
Enrollment
    ↓
Learner
    ↓
Progress
    ↓
Completion
```

without having to redesign the Offering Framework.

## Frontend consumer

Eventually the Business OS will consume this configuration when a business manages a Course.

Conceptually:

```text
Business OS
    │
    └── Course Management
          │
          ├── Course Information
          ├── Pricing
          ├── Duration
          ├── Capacity
          ├── Location
          ├── Instructor
          ├── Registration
          └── Enrollment
```

The public Marketplace will eventually consume the resulting published Offering and expose the appropriate learner journey. The architecture specifically positions Marketplace as the customer-facing layer that consumes Offerings and facilitates customer interactions.

## One important implementation note

I intentionally did not put registration creation or modification inside EnrollmentService.

The dependency is enforced through:

```js
this.ensureRegistrationSupported(offering);
```

That means:

```text
Course
 ├── Registration
 └── Enrollment
       │
       └── requires Registration
```

---

null is deliberately valid according to the current schema:

```js
{
    "maximumEnrollments": null,
    "enrollmentDeadlineMinutes": null
}
```

That represents no configured maximum enrollment limit or deadline.

---

One architectural point is especially important: Enrollment is configuration, not the actual enrollment transaction itself. This component defines how an offering may accept enrollments—approval, capacity, and deadline. A future enrollment/participant domain would handle the actual customer enrollment records, approval workflow, status, and capacity consumption.
