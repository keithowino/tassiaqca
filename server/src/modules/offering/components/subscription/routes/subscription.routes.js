import { Router } from "express";

import { authenticate, requirePermission } from "../../../../identity/index.js";

import { Permissions } from "../../../../../shared/index.js";

import { subscriptionController } from "../controllers/index.js";

const router = Router({
	mergeParams: true,
});

router.use(authenticate);

router.put(
	"/",
	requirePermission(Permissions.OFFERING_UPDATE),
	subscriptionController.setSubscription,
);

router.get(
	"/",
	requirePermission(Permissions.OFFERING_VIEW),
	subscriptionController.getSubscription,
);

export default router;
