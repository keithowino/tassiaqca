import { Router } from "express";

import { requirePermission } from "../../../../identity/index.js";

import { Permissions } from "../../../../../shared/index.js";

import { tagsController } from "../controllers/index.js";

const router = Router({
	mergeParams: true,
});

router
	.route("/")
	.get(requirePermission(Permissions.OFFERING_VIEW), tagsController.getTags)
	.put(
		requirePermission(Permissions.OFFERING_UPDATE),
		tagsController.setTags,
	);

export default router;
