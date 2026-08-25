## Test 1 — Create / Assign Instructors

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
