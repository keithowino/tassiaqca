import { Router } from "express";

import { authenticate, requirePermission } from "../../../../identity/index.js";

import { Permissions } from "../../../../../shared/index.js";

import { membershipController } from "../controllers/index.js";

const router = Router({
	mergeParams: true,
});

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
