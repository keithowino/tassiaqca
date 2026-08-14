import { Router } from "express";

import { authenticate, requirePermission } from "../../../../identity/index.js";

import { Permissions } from "../../../../../shared/constants/index.js";

import { categoriesController } from "../controllers/index.js";

const router = Router({
	mergeParams: true,
});

router.use(authenticate);

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
