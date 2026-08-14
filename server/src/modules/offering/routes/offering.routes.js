import { Router } from "express";

import { offeringController } from "../controllers/index.js";

import authenticate from "../../identity/middleware/authenticate.js";
import requirePermission from "../../identity/middleware/requirePermission.js";

import { Permissions } from "../../../shared/constants/index.js";
import { categoriesRoutes } from "../components/categories/routes/index.js";

const router = Router({
	mergeParams: true,
});

router.use(authenticate);

router
	.route("/")
	.get(
		requirePermission(Permissions.OFFERING_VIEW),
		offeringController.listOfferings,
	)
	.post(
		requirePermission(Permissions.OFFERING_CREATE),
		offeringController.createOffering,
	);

router
	.route("/:offeringId")
	.get(
		requirePermission(Permissions.OFFERING_VIEW),
		offeringController.getOffering,
	)
	.patch(
		requirePermission(Permissions.OFFERING_UPDATE),
		offeringController.updateOffering,
	);

router.patch(
	"/:offeringId/archive",
	requirePermission(Permissions.OFFERING_ARCHIVE),
	offeringController.archiveOffering,
);

router.patch(
	"/:offeringId/restore",
	requirePermission(Permissions.OFFERING_RESTORE),
	offeringController.restoreOffering,
);

router.use("/:offeringId/categories", categoriesRoutes);

export default router;
