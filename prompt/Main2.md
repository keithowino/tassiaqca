## Test 1 — Create Registration

```http
PUT http://localhost:5000/api/v1/businesses/6a72d57f8b94e4f1232d4112/offerings/6a8ad10652cd9501eaa22f04/registration
Authorization: Bearer {{access token}}
Content-Type: application/json

{
    "active": true,
    "approvalRequired": false,
    "maximumRegistrations": 100,
    "registrationDeadlineMinutes": 60
}
```

```js
// Response

{"success":true,"message":"Offering registration updated successfully.","data":{"id":"6a8c71c9b077e17f880d8cd6","businessId":"6a72d57f8b94e4f1232d4112","offeringId":"6a8ad10652cd9501eaa22f04","active":true,"approvalRequired":false,"maximumRegistrations":100,"registrationDeadlineMinutes":60,"createdBy":"6a72d55a8b94e4f1232d4110","updatedBy":"6a72d55a8b94e4f1232d4110","createdAt":"2026-08-24T16:31:05.208Z","updatedAt":"2026-08-24T16:31:05.208Z"}}
```

Tests 2 — Retrieve Registration, 3 — Update Registration, 4 — Invalid Maximum Registrations, 5 — Invalid Registration Deadline, 6 — Unsupported Offering, 7 - Offering Lifecycle Integration and 8 — Registration Disabled all passed successfully and or returned the expected responses.
