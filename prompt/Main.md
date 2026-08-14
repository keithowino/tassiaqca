## Test 1 — Get Categories Assigned to an Offering

```http
GET http://localhost:5000/api/v1/businesses/6a72d57f8b94e4f1232d4112/offerings/6a7ecaebc76c130dae23f2a5/categories
Authorization: Bearer {{access token}}
Content-Type: application/json
```

```js
// Response

{"success":true,"message":"Offering categories retrieved successfully.","data":[{"id":"6a7ecaebc76c130dae23f2a6","business":"6a72d57f8b94e4f1232d4112","offering":"6a7ecaebc76c130dae23f2a5","category":{"id":"6a7ace9386a66725a277ec44","name":"Laptops","slug":"laptops"},"createdBy":"6a72d55a8b94e4f1232d4110","updatedBy":"6a72d55a8b94e4f1232d4110","createdAt":"2026-08-14T07:59:39.661Z","updatedAt":"2026-08-14T07:59:39.661Z"}]}
```

## Test 2 — Get Categories for an Offering With No Categories

```js
// Response

{"success":true,"message":"Offering categories retrieved successfully.","data":[]}
```

## Test 3 — Replace Offering Categories

```http
PUT http://localhost:5000/api/v1/businesses/6a72d57f8b94e4f1232d4112/offerings/6a7ecaebc76c130dae23f2a5/categories
Authorization: Bearer {{access token}}
Content-Type: application/json

{
    "categoryIds": [
        "6a7acef386a66725a277ec46"
    ]
}
```

```js
// Response

{"success":true,"message":"Offering categories updated successfully.","data":[{"id":"6a7ece9ec76c130dae23f2ac","business":"6a72d57f8b94e4f1232d4112","offering":"6a7ecaebc76c130dae23f2a5","category":{"id":"6a7acef386a66725a277ec46"},"createdBy":"6a72d55a8b94e4f1232d4110","updatedBy":"6a72d55a8b94e4f1232d4110","createdAt":"2026-08-14T08:15:26.407Z","updatedAt":"2026-08-14T08:15:26.407Z"}]}
```

## Test 4 — Replace With One Category

```js
// Payload

{
    "categoryIds": [
        "6a7ecfe3c76c130dae23f2ad"
    ]
}

// Response

{"success":true,"message":"Offering categories updated successfully.","data":[{"id":"6a7ed078c76c130dae23f2af","business":"6a72d57f8b94e4f1232d4112","offering":"6a7ecaebc76c130dae23f2a5","category":{"id":"6a7ecfe3c76c130dae23f2ad"},"createdBy":"6a72d55a8b94e4f1232d4110","updatedBy":"6a72d55a8b94e4f1232d4110","createdAt":"2026-08-14T08:23:20.937Z","updatedAt":"2026-08-14T08:23:20.937Z"}]}
```

## Test 9 — Duplicate Category IDs

```http
PUT http://localhost:5000/api/v1/businesses/6a72d57f8b94e4f1232d4112/offerings/6a7ecaebc76c130dae23f2a5/categories
Authorization: Bearer {{access token}}
Content-Type: application/json

{
    "categoryIds": [
        "6a7acef386a66725a277ec46",
        "6a7ace9386a66725a277ec44",
        "6a7ace9386a66725a277ec44",
        "6a7acef386a66725a277ec46",
        "6a7ecfe3c76c130dae23f2ad"
    ]
}
```

```js
// Response

{"success":true,"message":"Offering categories updated successfully.","data":[{"id":"6a7ed2fcc76c130dae23f2b0","business":"6a72d57f8b94e4f1232d4112","offering":"6a7ecaebc76c130dae23f2a5","category":{"id":"6a7acef386a66725a277ec46"},"createdBy":"6a72d55a8b94e4f1232d4110","updatedBy":"6a72d55a8b94e4f1232d4110","createdAt":"2026-08-14T08:34:04.770Z","updatedAt":"2026-08-14T08:34:04.770Z"},{"id":"6a7ed2fcc76c130dae23f2b1","business":"6a72d57f8b94e4f1232d4112","offering":"6a7ecaebc76c130dae23f2a5","category":{"id":"6a7ace9386a66725a277ec44"},"createdBy":"6a72d55a8b94e4f1232d4110","updatedBy":"6a72d55a8b94e4f1232d4110","createdAt":"2026-08-14T08:34:04.771Z","updatedAt":"2026-08-14T08:34:04.771Z"},{"id":"6a7ed2fcc76c130dae23f2b2","business":"6a72d57f8b94e4f1232d4112","offering":"6a7ecaebc76c130dae23f2a5","category":{"id":"6a7ecfe3c76c130dae23f2ad"},"createdBy":"6a72d55a8b94e4f1232d4110","updatedBy":"6a72d55a8b94e4f1232d4110","createdAt":"2026-08-14T08:34:04.771Z","updatedAt":"2026-08-14T08:34:04.771Z"}]}
```

Tests 5 — Clear All Categories, 6 — Invalid Category ID, 7 — Invalid Category ID Format, 8 — Inactive Category, 10 — Nonexistent Offering all passed successfully and or returned the expected responses.
