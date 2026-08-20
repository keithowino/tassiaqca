import { Router } from "express";

import { authenticate, requirePermission } from "../../../../identity/index.js";

import { Permissions } from "../../../../../shared/index.js";

import { durationController } from "../controllers/index.js";

const router = Router({
	mergeParams: true,
});

router.use(authenticate);

router.get(
	"/",
	requirePermission(Permissions.OFFERING_VIEW),
	durationController.getDuration,
);

router.post(
	"/",
	requirePermission(Permissions.OFFERING_UPDATE),
	durationController.createDuration,
);

router.patch(
	"/",
	requirePermission(Permissions.OFFERING_UPDATE),
	durationController.updateDuration,
);

router.patch(
	"/archive",
	requirePermission(Permissions.OFFERING_UPDATE),
	durationController.archiveDuration,
);

router.patch(
	"/restore",
	requirePermission(Permissions.OFFERING_UPDATE),
	durationController.restoreDuration,
);

export default router;
