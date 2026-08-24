## Test 1 — Create Booking

```js
// Response

{"success":true,"message":"Offering booking updated successfully.","data":{"id":"6a8c13919f90067b06b45acc","businessId":"6a72d57f8b94e4f1232d4112","offeringId":"6a8befac0e8199f945c3f2b8","active":true,"confirmationRequired":true,"minimumAdvanceMinutes":60,"maximumAdvanceMinutes":43200,"cancellationWindowMinutes":1440,"createdBy":"6a72d55a8b94e4f1232d4110","updatedBy":"6a72d55a8b94e4f1232d4110","createdAt":"2026-08-24T09:49:05.282Z","updatedAt":"2026-08-24T09:49:05.282Z"}}
```

---

Tests 2 — Retrieve Booking, 3 — Update Booking, 4 — Invalid advance window, 6 — Unsupported Product, 7 — Scheduling dependency, 8 — Service Booking, 9 — Rental Booking, 10 — Offering lifecycle integration all passed successfully and or returned the expected responses.
