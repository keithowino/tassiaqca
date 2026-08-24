## Test 1 — Create Service Scheduling

```js
// Response

{"success":true,"message":"Offering scheduling updated successfully.","data":{"id":"6a8bece50e8199f945c3f2b5","businessId":"6a72d57f8b94e4f1232d4112","offeringId":"6a8acd5c52cd9501eaa22efc","mode":"RECURRING","timezone":"Africa/Nairobi","active":true,"createdBy":"6a72d55a8b94e4f1232d4110","updatedBy":"6a72d55a8b94e4f1232d4110","createdAt":"2026-08-24T07:04:05.046Z","updatedAt":"2026-08-24T07:04:05.046Z"}}
```

Tests 2 — Retrieve, 3 — Update, 4 — Invalid mode, 5 — Missing timezone, 6 — Unsupported Product, 7 — Booking, 8 — Rental, 9 — Offering lifecycle integration all passed successfully and or returned the expected responses.
