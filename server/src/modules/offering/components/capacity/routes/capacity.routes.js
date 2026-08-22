import { Router } from "express";

import { authenticate, requirePermission } from "../../../../identity/index.js";

import { Permissions } from "../../../../../shared/index.js";

import { capacityController } from "../controllers/index.js";

const router = Router({
	mergeParams: true,
});

router.use(authenticate);

router.get(
	"/",
	requirePermission(Permissions.OFFERING_VIEW),
	capacityController.getCapacity,
);

router.put(
	"/",
	requirePermission(Permissions.OFFERING_UPDATE),
	capacityController.setCapacity,
);

export default router;
