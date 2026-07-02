## Successful Invite

Response

```js
{"success":true,"message":"Member invited successfully.","data":{"business":"6a463756eed8cb5e2897566f","user":"6a453c6c25f78f8432e00bae","role":"6a451ec4b20eb8419e8a8be6","active":true,"_id":"6a463a223c83ca0d829e0039","joinedAt":"2026-07-02T10:14:58.468Z","createdAt":"2026-07-02T10:14:58.470Z","updatedAt":"2026-07-02T10:14:58.470Z","__v":0}}
```

## Duplicate Invite

Response

```js
{"success":false,"error":{"code":"CONFLICT","message":"User is already a member of this business.","details":null}}
```

## Unknown User

Response

```js
{"success":false,"error":{"code":"NOT_FOUND","message":"User not found.","details":null}}
```

## Invalid Role

```js
{"success":false,"error":{"code":"NOT_FOUND","message":"Role not found.","details":null}}
```
