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

router.use(authenticate);

router
	.route("/")
	.get(
		requirePermission(Permissions.INVENTORY_VIEW),
		inventoryController.list,
	)
	.post(
		requirePermission(Permissions.INVENTORY_CREATE),
		inventoryController.create,
	);

router
	.route("/:inventoryId")
	.get(
		requirePermission(Permissions.INVENTORY_VIEW),
		inventoryController.getById,
	)
	.patch(
		requirePermission(Permissions.INVENTORY_UPDATE),
		inventoryController.update,
	)
	.delete(
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
