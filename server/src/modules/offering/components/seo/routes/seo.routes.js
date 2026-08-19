import { Router } from "express";

import { requirePermission } from "../../../../identity/index.js";

import { Permissions } from "../../../../../shared/index.js";

import { seoController } from "../controllers/index.js";

const router = Router({
	mergeParams: true,
});

router
	.route("/")
	.get(requirePermission(Permissions.OFFERING_VIEW), seoController.getSeo)
	.put(requirePermission(Permissions.OFFERING_UPDATE), seoController.setSeo);

export default router;
