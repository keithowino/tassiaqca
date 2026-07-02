## Test 1 — No Access Token

Response

```js
{"success":false,"error":{"code":"UNAUTHORIZED","message":"Authentication required.","details":null}}
```

## Test 2 — Invalid Token

Response

```js
{"success":false,"error":{"code":"UNAUTHORIZED","message":"Invalid access token.","details":null}}
```

## Test 3 — Not a Member

Response

```js
{"success":false,"error":{"code":"FORBIDDEN","message":"You are not a member of this business.","details":null}}
```

## Test 4 — Owner

Response

```js
{"success":true,"message":"Members retrieved successfully.","data":[{"_id":"6a46432b01cf16265e9d86eb","business":"6a46432b01cf16265e9d86ea","user":{"_id":"6a4642ab01cf16265e9d86e5","firstName":"Keith","lastName":"Owino","email":"designsolutions1629@gmail.com","phone":"+254768290857","password":"$2b$12$d8sfXq1SOO9G.1gQOhjfmONI4bvnSPTlTAkbHqryHXyAPXzsIMO0S","emailVerified":false,"active":true,"createdAt":"2026-07-02T10:51:23.468Z","updatedAt":"2026-07-02T10:51:23.468Z","__v":0},"role":{"_id":"6a46418e44bdd00dfa9adf4d","name":"Owner","slug":"owner","description":"Business owner","permissions":["6a464128a0b79addb67b04da","6a464128a0b79addb67b04db","6a464128a0b79addb67b04dc","6a464128a0b79addb67b04dd","6a464128a0b79addb67b04de","6a464128a0b79addb67b04df","6a464128a0b79addb67b04e0","6a464128a0b79addb67b04e1","6a464128a0b79addb67b04e2","6a464128a0b79addb67b04e3","6a464128a0b79addb67b04e4","6a464128a0b79addb67b04e5","6a464128a0b79addb67b04e6"],"system":true,"__v":0,"createdAt":"2026-07-02T10:46:38.406Z","updatedAt":"2026-07-02T10:46:38.406Z"},"active":true,"joinedAt":"2026-07-02T10:53:31.707Z","createdAt":"2026-07-02T10:53:31.708Z","updatedAt":"2026-07-02T10:53:31.708Z","__v":0},{"_id":"6a464d38fd14e273edd28937","business":"6a46432b01cf16265e9d86ea","user":{"_id":"6a4642b201cf16265e9d86e7","firstName":"Love","lastName":"Rembo","email":"rembo1234@gmail.com","phone":"+254734567890","password":"$2b$12$in8sNGqxVEfpI7wjG9WSouFPD70DaEcd18b1fo.JYPYfBrLLnsX4O","emailVerified":false,"active":true,"createdAt":"2026-07-02T10:51:30.699Z","updatedAt":"2026-07-02T10:51:30.699Z","__v":0},"role":{"_id":"6a46418e44bdd00dfa9adf50","name":"Staff","slug":"staff","description":"Business staff","permissions":["6a464128a0b79addb67b04e0","6a464128a0b79addb67b04e3"],"system":true,"__v":0,"createdAt":"2026-07-02T10:46:38.407Z","updatedAt":"2026-07-02T10:46:38.407Z"},"active":true,"joinedAt":"2026-07-02T11:36:24.280Z","createdAt":"2026-07-02T11:36:24.281Z","updatedAt":"2026-07-02T11:36:24.281Z","__v":0}]}
```

## Test 5 — Staff Member

Response

```js
{"success":false,"error":{"code":"FORBIDDEN","message":"You do not have permission to perform this action.","details":null}}
```
