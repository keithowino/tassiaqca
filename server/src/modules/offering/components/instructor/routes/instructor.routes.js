import { Router } from "express";

import { authenticate, requirePermission } from "../../../../identity/index.js";

import { Permissions } from "../../../../../shared/index.js";

import { instructorController } from "../controllers/index.js";

const router = Router({
	mergeParams: true,
});

router.use(authenticate);

router.get(
	"/",
	requirePermission(Permissions.OFFERING_VIEW),
	instructorController.getInstructors,
);

router.put(
	"/",
	requirePermission(Permissions.OFFERING_UPDATE),
	instructorController.setInstructors,
);

export default router;
