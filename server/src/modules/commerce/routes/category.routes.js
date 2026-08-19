import { Router } from "express";

import authenticate from "../../identity/middleware/authenticate.js";

import categoryController from "../controllers/category.controller.js";

import requirePermission from "../../identity/middleware/requirePermission.js";

import { Permissions } from "../../../shared/index.js";

const router = Router({
	mergeParams: true,
});

router.post(
	"/",
	authenticate,
	requirePermission(Permissions.CATEGORY_CREATE),
	categoryController.create,
);

router.get(
	"/",
	authenticate,
	requirePermission(Permissions.CATEGORY_VIEW),
	categoryController.list,
);

router.get(
	"/:categoryId",
	authenticate,
	requirePermission(Permissions.CATEGORY_VIEW),
	categoryController.get,
);

router.patch(
	"/:categoryId",
	authenticate,
	requirePermission(Permissions.CATEGORY_UPDATE),
	categoryController.update,
);

router.delete(
	"/:categoryId",
	authenticate,
	requirePermission(Permissions.CATEGORY_DELETE),
	categoryController.archive,
);

router.patch(
	"/:categoryId/restore",
	authenticate,
	requirePermission(Permissions.CATEGORY_UPDATE),
	categoryController.restore,
);

export default router;
