import { Router } from "express";

import { productImageController } from "../controllers/index.js";

import authenticate from "../../identity/middleware/authenticate.js";
import requirePermission from "../../identity/middleware/requirePermission.js";

import { Permissions } from "../../../shared/constants/index.js";
import upload from "../../../shared/middleware/upload.js";

const router = Router({
	mergeParams: true,
});

router.use(authenticate);

router
	.route("/")
	.get(
		requirePermission(Permissions.PRODUCT_IMAGE_VIEW),
		productImageController.list,
	)
	.post(
		requirePermission(Permissions.PRODUCT_IMAGE_CREATE),
		upload.single("image"),
		productImageController.create,
	);

router
	.route("/:imageId")
	.get(
		requirePermission(Permissions.PRODUCT_IMAGE_VIEW),
		productImageController.getById,
	)
	.patch(
		requirePermission(Permissions.PRODUCT_IMAGE_UPDATE),
		productImageController.update,
	)
	.delete(
		requirePermission(Permissions.PRODUCT_IMAGE_DELETE),
		productImageController.remove,
	);

router.patch(
	"/:imageId/primary",
	requirePermission(Permissions.PRODUCT_IMAGE_UPDATE),
	productImageController.setPrimary,
);

export default router;
