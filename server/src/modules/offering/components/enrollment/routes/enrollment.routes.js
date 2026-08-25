import { Router } from "express";

import { authenticate, requirePermission } from "../../../../identity/index.js";

import { Permissions } from "../../../../../shared/index.js";

import { enrollmentController } from "../controllers/index.js";

const router = Router({
	mergeParams: true,
});

router.use(authenticate);

router.get(
	"/",
	requirePermission(Permissions.OFFERING_VIEW),
	enrollmentController.getEnrollment,
);

router.put(
	"/",
	requirePermission(Permissions.OFFERING_UPDATE),
	enrollmentController.setEnrollment,
);

export default router;
