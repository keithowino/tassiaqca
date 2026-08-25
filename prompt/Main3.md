- Test 1 — Create Enrollment

```js
// Response

{"success":true,"message":"Offering enrollment updated successfully.","data":{"id":"6a8d4c877f3b79f5263e3a3f","businessId":"6a72d57f8b94e4f1232d4112","offeringId":"6a8ad667e3c755bf9372129c","active":true,"approvalRequired":false,"maximumEnrollments":100,"enrollmentDeadlineMinutes":60,"createdBy":"6a72d55a8b94e4f1232d4110","updatedBy":"6a72d55a8b94e4f1232d4110","createdAt":"2026-08-25T08:04:23.845Z","updatedAt":"2026-08-25T08:04:23.845Z"}}
```

---

Tests 2 — Retrieve Enrollment, 3 — Update Enrollment, 4 — Invalid Maximum Enrollments, 5 — Invalid Enrollment Deadline, 6 — Unsupported Offering, 7 — Offering Lifecycle Integration all passed successfully and or returned the expected responses.

---

```bash
PHASE A — Shared Offering Components
────────────────────────────────────

1. Metadata (covered)
2. Tags (covered)
3. Categories (covered)
4. Media (covered)
5. SEO (covered)


PHASE B — Offering Structure
────────────────────────────────────

6. Attributes (covered)
7. Variants  (covered)


PHASE C — Commerce Operations
────────────────────────────────────

8. Pricing (covered)
9. Inventory  (partially covered)


PHASE D — Availability / Time
────────────────────────────────────

10. Duration  (covered)
11. Capacity  (covered)
12. Location (covered)
13. Calendar (covered)
14. Scheduling (covered)


PHASE E — Customer Interaction
────────────────────────────────────

15. Booking (covered)
16. Registration (covered)
17. Enrollment (covered)
18. Instructor


PHASE F — Specialized Offering Models
────────────────────────────────────

19. Membership
20. Subscription
21. Download
```

- Let's proceed to build the Instructor offering component, it's implementation should follow the following structure and if you see fit, use the Pricing, Media and or the rest of the crated offering components as a point of reference:

```text
server/src/modules/offering/components/instructor/

├── builders/
│   ├── instructor.builder.js
│   ├── instructor.factory.js
│   └── index.js
│
├── controllers/
│   ├── instructor.controller.js
│   └── index.js
│
├── models/
│   ├── instructor.model.js
│   └── index.js
│
├── presenters/
│   ├── instructor.presenter.js
│   └── index.js
│
├── repositories/
│   ├── instructor.repository.js
│   └── index.js
│
├── routes/
│   ├── instructor.routes.js
│   └── index.js
│
├── services/
│   ├── instructor.service.js
│   └── index.js
│
├── validators/
│   ├── instructor.schema.js
│   ├── index.js
│   └── ...
│
├── instructor.component.js
│
└── index.js
```

Before implementation analyze:

- What responsibility does it own?
- What Offering Types use it?
- What other components does it depend on?
- What components may depend on it?
- What lifecycle hooks does it participate in?
- What validation does it perform?
- What invariants must remain true?
- What business concept does it represent?
- What API does it require?
- What permissions are required?
- What audit events are required?
- What frontend experience will eventually consume it?

Only after this analysis should implementation begin.
