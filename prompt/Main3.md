- Test 1 — Create / Assign Instructors

```http
PUT http://localhost:5000/api/v1/businesses/6a8d6eea59b6cb66307fa104/offerings/6a8d728e59b6cb66307fa10d/instructor
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YThkNmUxMDU5YjZjYjY2MzA3ZmExMDIiLCJlbWFpbCI6ImRlc2lnbnNvbHV0aW9uczE2MjlAZ21haWwuY29tIiwic2lkIjoiNmE4ZDZlMTA1OWI2Y2I2NjMwN2ZhMTAzIiwiaWF0IjoxNzg3NjUzNjQ4LCJleHAiOjE3ODc3NDAwNDgsImF1ZCI6InRhc3NpYXFjYS1jbGllbnQiLCJpc3MiOiJ0YXNzaWFxY2EifQ.DIw6BztSIE0ZPerU8RoGFeRfy1WVQajAwwqhEor3jiU
Content-Type: application/json

{
    "instructors": [
        "6a8d6eea59b6cb66307fa106",
        "6a8d713459b6cb66307fa10b"
    ]
}
```

```js
// Response

{"success":true,"message":"Offering instructors updated successfully.","data":[{"id":"6a8d758f70ad60ff18c2f87d","businessId":"6a8d6eea59b6cb66307fa104","offeringId":"6a8d728e59b6cb66307fa10d","businessMemberId":"6a8d6eea59b6cb66307fa106","active":true,"createdBy":"6a8d6e1059b6cb66307fa102","updatedBy":"6a8d6e1059b6cb66307fa102","createdAt":"2026-08-25T10:59:27.489Z","updatedAt":"2026-08-25T10:59:27.489Z"},{"id":"6a8d758f70ad60ff18c2f87e","businessId":"6a8d6eea59b6cb66307fa104","offeringId":"6a8d728e59b6cb66307fa10d","businessMemberId":"6a8d713459b6cb66307fa10b","active":true,"createdBy":"6a8d6e1059b6cb66307fa102","updatedBy":"6a8d6e1059b6cb66307fa102","createdAt":"2026-08-25T10:59:27.490Z","updatedAt":"2026-08-25T10:59:27.490Z"}]}
```

---

Tests 2 — Retrieve Instructors, 3 — Replace Instructor Assignment, 4 — Duplicate Instructor Validation, 5 — Invalid BusinessMember, 6 — Cross-Business BusinessMember, 7 — Inactive BusinessMember, 8 — Unsupported Offering, 9 — Offering Lifecycle Integration, 10 — Audit Verification all passed successfully and or returned the expected responses.

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
18. Instructor (covered)

PHASE F — Specialized Offering Models
────────────────────────────────────

19. Membership (covered)
20. Subscription (covered)
21. Download
```

- Let's proceed to build the Membership offering component, it's implementation should follow the following structure and if you see fit, use the Pricing, Media and or the rest of the crated offering components as a point of reference:

```text
server/src/modules/offering/components/membership/

├── builders/
│   ├── membership.builder.js
│   ├── membership.factory.js
│   └── index.js
│
├── controllers/
│   ├── membership.controller.js
│   └── index.js
│
├── models/
│   ├── membership.model.js
│   └── index.js
│
├── presenters/
│   ├── membership.presenter.js
│   └── index.js
│
├── repositories/
│   ├── membership.repository.js
│   └── index.js
│
├── routes/
│   ├── membership.routes.js
│   └── index.js
│
├── services/
│   ├── membership.service.js
│   └── index.js
│
├── validators/
│   ├── membership.schema.js
│   ├── index.js
│   └── ...
│
├── membership.component.js
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
