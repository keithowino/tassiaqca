import { Router } from "express";

import { inventoryController } from "../controllers/index.js";

import authenticate from "../../identity/middleware/authenticate.js";
import requirePermission from "../../identity/middleware/requirePermission.js";

import { Permissions } from "../../../shared/constants/index.js";

const router = Router({
	mergeParams: true,
});

/*
|--------------------------------------------------------------------------
| Inventory
|--------------------------------------------------------------------------
*/

router.post(
	"/",
	authenticate,
	requirePermission(Permissions.INVENTORY_CREATE),
	inventoryController.create,
);

router.get(
	"/",
	authenticate,
	requirePermission(Permissions.INVENTORY_VIEW),
	inventoryController.list,
);

router.get(
	"/:inventoryId",
	authenticate,
	requirePermission(Permissions.INVENTORY_VIEW),
	inventoryController.getById,
);

router.patch(
	"/:inventoryId",
	authenticate,
	requirePermission(Permissions.INVENTORY_UPDATE),
	inventoryController.update,
);

router.delete(
	"/:inventoryId",
	authenticate,
	requirePermission(Permissions.INVENTORY_DELETE),
	inventoryController.archive,
);

router.patch(
	"/:inventoryId/restore",
	authenticate,
	requirePermission(Permissions.INVENTORY_UPDATE),
	inventoryController.restore,
);

export default router;
