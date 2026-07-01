## Test 1 — Invalid JWT

Response

```js
{"success":false,"error":{"code":"UNAUTHORIZED","message":"Invalid refresh token.","details":null}}
```

## Test 2 — Expired JWT

Response

```js
{"success":false,"error":{"code":"UNAUTHORIZED","message":"Refresh token has expired.","details":null}}
```

Now i understand what `JWT_REFRESH_EXPIRES=30d` does, i have witnessed when it is set at 5 seconds the previous token expires, what about `JWT_ACCESS_EXPIRES=15m`.
