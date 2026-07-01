## Test 1 — No Authorization Header

Response

```js
{"success":false,"error":{"code":"UNAUTHORIZED","message":"Authentication required.","details":null}}
```

## Test 2 — Invalid Access Token

Response

```js
{"success":false,"error":{"code":"UNAUTHORIZED","message":"Invalid access token.","details":null}}
```

## Test 3 — Valid Access Token

Response

```js
{"success":true,"data":{"user":{"id":"6a44ca670a57f5c8a073921b","firstName":"Love","lastName":"Rembo","email":"rembo1234@gmail.com","avatar":{}}}}
```
