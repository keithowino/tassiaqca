import { Router } from "express";

import { requirePermission } from "../../../../identity/index.js";

import { Permissions } from "../../../../../shared/constants/index.js";

import { mediaController } from "../controllers/index.js";

const router = Router({
	mergeParams: true,
});

router
	.route("/")
	.get(requirePermission(Permissions.OFFERING_VIEW), mediaController.getMedia)
	.put(
		requirePermission(Permissions.OFFERING_UPDATE),
		mediaController.setMedia,
	);

export default router;
