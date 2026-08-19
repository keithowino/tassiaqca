import { Router } from "express";

import { variantsController } from "../controllers/index.js";

import { requirePermission } from "../../../../identity/index.js";

import { Permissions } from "../../../../../shared/index.js";

const router = Router({
	mergeParams: true,
});

router.get(
	"/",
	requirePermission(Permissions.OFFERING_VIEW),
	variantsController.getList,
);

router.post(
	"/",
	requirePermission(Permissions.OFFERING_CREATE),
	variantsController.create,
);

router.get(
	"/:variantId",
	requirePermission(Permissions.OFFERING_VIEW),
	variantsController.getById,
);

router.patch(
	"/:variantId",
	requirePermission(Permissions.OFFERING_UPDATE),
	variantsController.update,
);

router.patch(
	"/:variantId/archive",
	requirePermission(Permissions.OFFERING_ARCHIVE),
	variantsController.archive,
);

router.patch(
	"/:variantId/restore",
	requirePermission(Permissions.OFFERING_RESTORE),
	variantsController.restore,
);

export default router;
