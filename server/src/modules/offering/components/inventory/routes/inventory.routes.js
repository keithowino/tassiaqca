import { Router } from "express";

import { authenticate, requirePermission } from "../../../../identity/index.js";

import { Permissions } from "../../../../../shared/index.js";

import { inventoryController } from "../controllers/index.js";

const router = Router({
	mergeParams: true,
});

router.use(authenticate);

router.get(
	"/",
	requirePermission(Permissions.INVENTORY_VIEW),
	inventoryController.listInventory,
);

router.get(
	"/current",
	requirePermission(Permissions.INVENTORY_VIEW),
	inventoryController.getInventory,
);

router.post(
	"/",
	requirePermission(Permissions.INVENTORY_CREATE),
	inventoryController.createInventory,
);

router.patch(
	"/",
	requirePermission(Permissions.INVENTORY_UPDATE),
	inventoryController.updateInventory,
);

export default router;
