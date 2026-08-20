import { Router } from "express";

import { authenticate, requirePermission } from "../../../../identity/index.js";

import { Permissions } from "../../../../../shared/index.js";

import { attributesController } from "../controllers/index.js";

const router = Router({
	mergeParams: true,
});

router.use(authenticate);

router
	.route("/")
	.get(
		requirePermission(Permissions.OFFERING_VIEW),
		attributesController.getAttributes,
	)
	.put(
		requirePermission(Permissions.OFFERING_UPDATE),
		attributesController.setAttributes,
	);

export default router;
