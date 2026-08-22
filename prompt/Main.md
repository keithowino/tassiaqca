## Test - 1 Create Course Capacity

```http
PUT http://localhost:5000/api/v1/businesses/6a72d57f8b94e4f1232d4112/offerings/6a88063a21ae424fe5f8321c/capacity
Authorization: Bearer {{access token}}
Content-Type: application/json

{
    "limit": 100
}
```

```js
// Response

{"success":true,"message":"Offering capacity updated successfully.","data":{"id":"6a895f0322efe26521adace1","businessId":"6a72d57f8b94e4f1232d4112","offeringId":"6a88063a21ae424fe5f8321c","limit":100,"createdBy":"6a72d55a8b94e4f1232d4110","updatedBy":"6a72d55a8b94e4f1232d4110","createdAt":"2026-08-22T08:34:11.587Z","updatedAt":"2026-08-22T08:34:11.587Z"}}
```

---

Tests 2 - Retrieve capacity, 3 - Update capacity, 4 - Invalid capacity, 5 - Unsupported Offering and offering lifecycle integration confirmed all passed successfully and or returned the expected responses.
