## Test 1 — Create Service Calendar

```js
// Response

{"success":true,"message":"Offering calendar updated successfully.","data":{"id":"6a8aedab4a3d76c0e9fc7983","businessId":"6a72d57f8b94e4f1232d4112","offeringId":"6a8acd5c52cd9501eaa22efc","name":"Main Service Calendar","timezone":"Africa/Nairobi","type":"INTERNAL","active":true,"createdBy":"6a72d55a8b94e4f1232d4110","updatedBy":"6a72d55a8b94e4f1232d4110","createdAt":"2026-08-23T12:55:07.125Z","updatedAt":"2026-08-23T12:55:07.125Z"}}
```

---

- Tests 2 — Retrieve, 3 — Update, 4 — Invalid type, 5 — Missing name, 6 — Unsupported Product, 7 — Dependency invariant, 8 — Booking all passed successfully and or returned the expected responses.
- Let's proceed to build the Scheduling offering component, it's implementation should follow the following structure and if you see fit, use the Pricing, Media and or the rest of the crated offering components as a point of reference:

```bash
├── builders/
├── controllers/
├── models/
├── presenters/
├── repositories/
├── routes/
├── services/
├── validators/
└── media.component.js
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
