import { Router } from "express";

import { stockMovementController } from "../controllers/index.js";

import authenticate from "../../identity/middleware/authenticate.js";
import requirePermission from "../../identity/middleware/requirePermission.js";

import { Permissions } from "../../../shared/constants/index.js";

const router = Router({
	mergeParams: true,
});

router.use(authenticate);

router
	.route("/")
	.get(
		requirePermission(Permissions.STOCK_MOVEMENT_VIEW),
		stockMovementController.list,
	)
	.post(
		requirePermission(Permissions.STOCK_MOVEMENT_CREATE),
		stockMovementController.create,
	);

router.get(
	"/:movementId",
	requirePermission(Permissions.STOCK_MOVEMENT_VIEW),
	stockMovementController.getById,
);

export default router;
