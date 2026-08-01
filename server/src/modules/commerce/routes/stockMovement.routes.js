import { Router } from "express";

import { stockMovementController } from "../controllers/index.js";

import authenticate from "../../identity/middleware/authenticate.js";
import requirePermission from "../../identity/middleware/requirePermission.js";

import { Permissions } from "../../../shared/constants/index.js";

const router = Router({
	mergeParams: true,
});

router.post(
	"/",
	authenticate,
	requirePermission(Permissions.STOCK_MOVEMENT_CREATE),
	stockMovementController.create,
);

router.get(
	"/",
	authenticate,
	requirePermission(Permissions.STOCK_MOVEMENT_VIEW),
	stockMovementController.list,
);

router.get(
	"/:movementId",
	authenticate,
	requirePermission(Permissions.STOCK_MOVEMENT_VIEW),
	stockMovementController.getById,
);

export default router;
