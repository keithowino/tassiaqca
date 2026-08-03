/**
 * Do not remove the commented block till further notice.
 */
// import { Router } from "express";
// import { productController } from "../controllers/index.js";
// import authenticate from "../../identity/middleware/authenticate.js";
// import requirePermission from "../../identity/middleware/requirePermission.js";
// import { Permissions } from "../../../shared/constants/index.js";

// const router = Router({
// 	mergeParams: true,
// });

// router.post(
// 	"/",
// 	authenticate,
// 	requirePermission(Permissions.PRODUCT_CREATE),
// 	productController.create,
// );

// router.get(
// 	"/",
// 	authenticate,
// 	requirePermission(Permissions.PRODUCT_VIEW),
// 	productController.list,
// );

// router.get(
// 	"/:productId",
// 	authenticate,
// 	requirePermission(Permissions.PRODUCT_VIEW),
// 	productController.getById,
// );

// router.patch(
// 	"/:productId",
// 	authenticate,
// 	requirePermission(Permissions.PRODUCT_UPDATE),
// 	productController.update,
// );

// router.delete(
// 	"/:productId",
// 	authenticate,
// 	requirePermission(Permissions.PRODUCT_DELETE),
// 	productController.archive,
// );

// router.patch(
// 	"/:productId/restore",
// 	authenticate,
// 	requirePermission(Permissions.PRODUCT_UPDATE),
// 	productController.restore,
// );

// export default router;

import { Router } from "express";
import { productController } from "../controllers/index.js";
import authenticate from "../../identity/middleware/authenticate.js";
import requirePermission from "../../identity/middleware/requirePermission.js";
import { Permissions } from "../../../shared/constants/index.js";

const router = Router({
	mergeParams: true,
});

router.get(
	"/",
	authenticate,
	requirePermission(Permissions.PRODUCT_VIEW),
	productController.list,
);

router.get(
	"/:productId",
	authenticate,
	requirePermission(Permissions.PRODUCT_VIEW),
	productController.getById,
);

export default router;
