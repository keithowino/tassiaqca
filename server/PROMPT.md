- I went with option 1 - `const { params } = validateRequest(removeMemberRequestSchema, req);`.

## Test 3 — User Is Not a Member of the Business (a valid access token, a business the user does not belong to)

Response

```js
{"success":false,"error":{"code":"NOT_FOUND","message":"Member not found.","details":null}}
```

## Test 4 — Member Without Permission (Owner creates a business, Invite another user as Staff, Login as Staff, Attempt to remove another member.)

Response

```js
{"success":false,"error":{"code":"FORBIDDEN","message":"You do not have permission to perform this action.","details":null}}
```

## Test 5 — Unknown Member (Use a valid businessId but a fake memberId.)

Response

```js
{"success":false,"error":{"code":"NOT_FOUND","message":"Member not found.","details":null}}
```

## Test 6 — Member Belongs to Another Business (Create Business A, Business B, Invite the same (or different) user into Business B.)

Response

```js
{"success":false,"error":{"code":"NOT_FOUND","message":"Member not found.","details":null}}
```

## Test 7 — Remove Yourself

Response

```js
{"success":false,"error":{"code":"BAD_REQUEST","message":"You cannot remove yourself.","details":null}}
```

## Test 8 — Successful Removal

Response

```js
{"success":true,"message":"Member removed successfully.","data":{"memberId":"6a467e5ad75e139172bf574f"}}
```

## Test 9 — Verify Database State

- The removed member no longer appear in the response.
