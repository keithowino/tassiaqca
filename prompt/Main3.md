## Test 1 — Create Booking

```js
// Response

{"success":true,"message":"Offering booking updated successfully.","data":{"id":"6a8c13919f90067b06b45acc","businessId":"6a72d57f8b94e4f1232d4112","offeringId":"6a8befac0e8199f945c3f2b8","active":true,"confirmationRequired":true,"minimumAdvanceMinutes":60,"maximumAdvanceMinutes":43200,"cancellationWindowMinutes":1440,"createdBy":"6a72d55a8b94e4f1232d4110","updatedBy":"6a72d55a8b94e4f1232d4110","createdAt":"2026-08-24T09:49:05.282Z","updatedAt":"2026-08-24T09:49:05.282Z"}}
```

---

- Tests 2 — Retrieve Booking, 3 — Update Booking, 4 — Invalid advance window, 6 — Unsupported Product, 7 — Scheduling dependency, 8 — Service Booking, 9 — Rental Booking, 10 — Offering lifecycle integration all passed successfully and or returned the expected responses.

---

- Let's proceed to build the Registration offering component, it's implementation should follow the following structure and if you see fit, use the Pricing, Media and or the rest of the crated offering components as a point of reference:

```bash
├── builders/
├── controllers/
├── models/
├── presenters/
├── repositories/
├── routes/
├── services/
├── validators/
└── registration.component.js
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
