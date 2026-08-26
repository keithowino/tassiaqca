import { Router } from "express";

import { authenticate, requirePermission } from "../../../../identity/index.js";

import { Permissions } from "../../../../../shared/index.js";

import { downloadController } from "../controllers/index.js";

const router = Router({
	mergeParams: true,
});

router.use(authenticate);

router.put(
	"/",
	requirePermission(Permissions.OFFERING_UPDATE),
	downloadController.setDownload,
);

router.get(
	"/",
	requirePermission(Permissions.OFFERING_VIEW),
	downloadController.getDownload,
);

export default router;
