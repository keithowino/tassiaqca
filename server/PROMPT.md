## Test non-existing email

Response

```js
{"success":false,"error":{"code":"UNAUTHORIZED","message":"Invalid email or password.","details":null}}
```

## Test Invalid request

Response

```js
{"success":false,"error":{"code":"VALIDATION_ERROR","message":"Validation failed.","details":[{"expected":"string","code":"invalid_type","path":["firstName"],"message":"First name is required"},{"expected":"string","code":"invalid_type","path":["email"],"message":"Email is required"},{"expected":"string","code":"invalid_type","path":["password"],"message":"Password is required"}]}}
```

Present users document

```js
{
  "_id": {
    "$oid": "6a43f1af37e62645160c9fdb"
  },
  "firstName": "Love",
  "lastName": "Rembo",
  "email": "rembo1234@gmail.com",
  "phone": "+254734567890",
  "password": "$2b$12$3PL22EU3ErJYzPN7SzwVCOtU92vr48l70pU/.GLpi/t9CfwHlhTYm",
  "emailVerified": false,
  "active": true,
  "createdAt": {
    "$date": "2026-06-30T16:41:19.254Z"
  },
  "updatedAt": {
    "$date": "2026-06-30T16:41:19.254Z"
  },
  "__v": 0
}
```

Present session documents

```js
{
  "_id": {
    "$oid": "6a43f1ea37e62645160c9fdd"
  },
  "user": {
    "$oid": "6a43f1af37e62645160c9fdb"
  },
  "refreshTokenHash": "c6d33c8f48ea4f95bf69fb41b6dee8163b9cdf4751aa943fc481c662c5c55019",
  "expiresAt": {
    "$date": "2026-07-30T16:42:18.422Z"
  },
  "ipAddress": null,
  "userAgent": null,
  "deviceName": null,
  "browser": null,
  "operatingSystem": null,
  "isRevoked": false,
  "revokedAt": null,
  "lastActivityAt": {
    "$date": "2026-06-30T16:42:18.422Z"
  },
  "createdAt": {
    "$date": "2026-06-30T16:42:18.422Z"
  },
  "updatedAt": {
    "$date": "2026-06-30T16:42:18.422Z"
  },
  "__v": 0
}
```

```js
{
  "_id": {
    "$oid": "6a43f1af37e62645160c9fdc"
  },
  "user": {
    "$oid": "6a43f1af37e62645160c9fdb"
  },
  "refreshTokenHash": "45b377f8d7074309be5321f846889d96c1a313b827da6c1ab164e81e9bd5c0b2",
  "expiresAt": {
    "$date": "2026-07-30T16:41:19.260Z"
  },
  "ipAddress": null,
  "userAgent": null,
  "deviceName": null,
  "browser": null,
  "operatingSystem": null,
  "isRevoked": false,
  "revokedAt": null,
  "lastActivityAt": {
    "$date": "2026-06-30T16:41:19.260Z"
  },
  "createdAt": {
    "$date": "2026-06-30T16:41:19.261Z"
  },
  "updatedAt": {
    "$date": "2026-06-30T16:41:19.261Z"
  },
  "__v": 0
}
```
