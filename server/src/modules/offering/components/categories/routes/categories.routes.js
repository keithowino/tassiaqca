import { Router } from "express";

import { requirePermission } from "../../../../identity/index.js";

import { Permissions } from "../../../../../shared/constants/index.js";

import { categoriesController } from "../controllers/index.js";

const router = Router({
	mergeParams: true,
});

router
	.route("/")
	.get(
		requirePermission(Permissions.OFFERING_VIEW),
		categoriesController.getCategories,
	)
	.put(
		requirePermission(Permissions.OFFERING_UPDATE),
		categoriesController.setCategories,
	);

export default router;
