import { Router } from "express";

import { requirePermission } from "../../../../identity/index.js";

import { Permissions } from "../../../../../shared/constants/index.js";

import { attributesController } from "../controllers/index.js";

const router = Router({
	mergeParams: true,
});

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
