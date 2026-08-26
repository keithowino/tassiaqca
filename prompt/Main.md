## Test Create a DIGITAL_DOWNLOAD offering

```http
POST http://localhost:5000/api/v1/businesses/6a8ddf134c68ac745fde97de/offerings
Authorization: Bearer {{access token}}
Content-Type: application/json

{
    "type": "DIGITAL_DOWNLOAD",
    "name": "TassiaQCA Architecture Guide",
    "description": "Digital architecture documentation."
}
```

```js
// Response

{"success":true,"message":"Offering created successfully.","data":{"id":"6a8ecefec810663b68850f32","businessId":"6a8ddf134c68ac745fde97de","type":"DIGITAL_DOWNLOAD","slug":"tassiaqca-architecture-guide","name":"TassiaQCA Architecture Guide","shortDescription":"","description":"Digital architecture documentation.","status":"DRAFT","visibility":"PUBLIC","searchable":true,"featured":false,"metadata":{},"createdAt":"2026-08-26T11:33:18.257Z","updatedAt":"2026-08-26T11:33:18.257Z"}}
```

## Test 1 — Create Download

```http
PUT http://localhost:5000/api/v1/businesses/6a8ddf134c68ac745fde97de/offerings/6a8ecefec810663b68850f32/download
Authorization: Bearer {{access token}}
Content-Type: application/json

{
    "assets": [
        "asset_guide_001",
        "asset_manual_001"
    ],
    "active": true,
    "maximumDownloads": 5,
    "expirationMinutes": 43200
}
```

```js
// Response

{"success":true,"message":"Offering download updated successfully.","data":{"id":"6a8ed041c810663b68850f35","businessId":"6a8ddf134c68ac745fde97de","offeringId":"6a8ecefec810663b68850f32","assets":["asset_guide_001","asset_manual_001"],"active":true,"maximumDownloads":5,"expirationMinutes":43200,"createdBy":"6a8ddee34c68ac745fde97dc","updatedBy":"6a8ddee34c68ac745fde97dc","createdAt":"2026-08-26T11:38:41.730Z","updatedAt":"2026-08-26T11:38:41.730Z"}}
```

---

Tests 2 — Retrieve Download, 3 — Update Download, 4 — Invalid Empty Assets, 5 — Invalid Empty Asset ID, 6 — Invalid Maximum Downloads, 7 — Null Maximum Downloads, 8 — Invalid Expiration, 9 — Null Expiration, 10 — Unsupported Offering, 11 — Download Disabled, 12 — Offering Lifecycle Integration, 13 — Offering Lifecycle Update, 14 — Audit Verification all passed successfully and or returned the expected responses.
