import { Router } from "express";

import { authenticate, requirePermission } from "../../../../identity/index.js";

import { Permissions } from "../../../../../shared/index.js";

import { schedulingController } from "../controllers/index.js";

const router = Router({
	mergeParams: true,
});

router.use(authenticate);

router.get(
	"/",
	requirePermission(Permissions.OFFERING_VIEW),
	schedulingController.getScheduling,
);

router.put(
	"/",
	requirePermission(Permissions.OFFERING_UPDATE),
	schedulingController.setScheduling,
);

export default router;
