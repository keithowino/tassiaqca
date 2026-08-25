## Test 1 — Create Membership

I found the error:

```js
`~\server\src\modules\offering\components\membership\routes\membership.routes.js`;

import { Router } from "express";

import { authenticate, requirePermission } from "../../../../identity/index.js";

import { Permissions } from "../../../../../shared/index.js";

import { membershipController } from "../controllers/index.js";

const router = Router();

router.use(authenticate);

router.put(
	"/",
	requirePermission(Permissions.OFFERING_UPDATE),
	membershipController.setMembership,
);

router.get(
	"/",
	requirePermission(Permissions.OFFERING_VIEW),
	membershipController.getMembership,
);

export default router;
```

As you can see we are using:

```js
const router = Router();
```

I changed it to this just like we have been doing:

```js
const router = Router({
	mergeParams: true,
});
```

and it responded as expected:

```js
{"success":true,"message":"Offering membership updated successfully.","data":{"id":"6a8de7b235181ae476ee2724","businessId":"6a8ddf134c68ac745fde97de","offeringId":"6a8ddf874c68ac745fde97e2","active":true,"approvalRequired":false,"durationMinutes":43200,"renewable":true,"createdBy":"6a8ddee34c68ac745fde97dc","updatedBy":"6a8ddee34c68ac745fde97dc","createdAt":"2026-08-25T19:06:26.226Z","updatedAt":"2026-08-25T19:06:26.226Z"}}
```

---

Tests 2 — Retrieve Membership, 3 — Update Membership, 4 — Invalid Duration, 5 — Null Duration, 6 — Unsupported Offering, 7 — Membership Disabled, 8 — Offering Lifecycle Integration and 9 — Audit Verification all passed successfully and or returned the expected responses.
