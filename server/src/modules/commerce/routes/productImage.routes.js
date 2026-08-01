import { Router } from "express";

import { productImageController } from "../controllers/index.js";

import authenticate from "../../identity/middleware/authenticate.js";
import requirePermission from "../../identity/middleware/requirePermission.js";

import { Permissions } from "../../../shared/constants/index.js";
import upload from "../../../shared/middleware/upload.js";

const router = Router({
	mergeParams: true,
});

router.post(
	"/",
	authenticate,
	requirePermission(Permissions.PRODUCT_IMAGE_CREATE),
	upload.single("image"),
	productImageController.create,
);

router.get(
	"/",
	authenticate,
	requirePermission(Permissions.PRODUCT_IMAGE_VIEW),
	productImageController.list,
);

router.get(
	"/:imageId",
	authenticate,
	requirePermission(Permissions.PRODUCT_IMAGE_VIEW),
	productImageController.getById,
);

router.patch(
	"/:imageId",
	authenticate,
	requirePermission(Permissions.PRODUCT_IMAGE_UPDATE),
	productImageController.update,
);

router.patch(
	"/:imageId/primary",
	authenticate,
	requirePermission(Permissions.PRODUCT_IMAGE_UPDATE),
	productImageController.setPrimary,
);

router.delete(
	"/:imageId",
	authenticate,
	requirePermission(Permissions.PRODUCT_IMAGE_DELETE),
	productImageController.remove,
);

export default router;
