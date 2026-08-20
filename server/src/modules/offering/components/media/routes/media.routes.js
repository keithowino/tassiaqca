import { Router } from "express";

import { authenticate, requirePermission } from "../../../../identity/index.js";

import { Permissions } from "../../../../../shared/index.js";

import { mediaController } from "../controllers/index.js";

const router = Router({
	mergeParams: true,
});

router.use(authenticate);

router
	.route("/")
	.get(requirePermission(Permissions.OFFERING_VIEW), mediaController.getMedia)
	.put(
		requirePermission(Permissions.OFFERING_UPDATE),
		mediaController.setMedia,
	);

export default router;
