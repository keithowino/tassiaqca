import { Router } from "express";

import { productPriceController } from "../controllers/index.js";

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
		requirePermission(Permissions.PRODUCT_PRICE_VIEW),
		productPriceController.list,
	)
	.post(
		requirePermission(Permissions.PRODUCT_PRICE_CREATE),
		productPriceController.create,
	);

router.get(
	"/:priceId",
	requirePermission(Permissions.PRODUCT_PRICE_VIEW),
	productPriceController.getById,
);

export default router;
