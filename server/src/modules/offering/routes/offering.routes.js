import { Router } from "express";

import { offeringController } from "../controllers/index.js";

import { authenticate, requirePermission } from "../../identity/index.js";

import { Permissions } from "../../../shared/index.js";

import { categoriesRoutes } from "../components/categories/routes/index.js";
import { pricingRoutes } from "../components/pricing/routes/index.js";
import { mediaRoutes } from "../components/media/routes/index.js";
import { attributesRoutes } from "../components/attributes/index.js";
import { tagsRoutes } from "../components/tags/index.js";
import { seoRoutes } from "../components/seo/index.js";
import { variantsRoutes } from "../components/variants/index.js";
import { inventoryRoutes } from "../components/inventory/index.js";

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

router.use("/:offeringId/pricing", pricingRoutes);

router.use("/:offeringId/media", mediaRoutes);

router.use("/:offeringId/attributes", attributesRoutes);

router.use("/:offeringId/tags", tagsRoutes);

router.use("/:offeringId/seo", seoRoutes);

router.use("/:offeringId/variants", variantsRoutes);

router.use("/:offeringId/inventory", inventoryRoutes);

export default router;
