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
import { durationRoutes } from "../components/duration/index.js";
import { capacityRoutes } from "../components/capacity/index.js";
import { locationRoutes } from "../components/location/index.js";
import { calendarRoutes } from "../components/calendar/index.js";
import { schedulingRoutes } from "../components/scheduling/index.js";
import { bookingRoutes } from "../components/booking/index.js";
import { registrationRoutes } from "../components/registration/index.js";
import { enrollmentRoutes } from "../components/enrollment/index.js";
import { instructorRoutes } from "../components/instructor/index.js";

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

router.use("/:offeringId/duration", durationRoutes);

router.use("/:offeringId/capacity", capacityRoutes);

router.use("/:offeringId/location", locationRoutes);

router.use("/:offeringId/calendar", calendarRoutes);

router.use("/:offeringId/scheduling", schedulingRoutes);

router.use("/:offeringId/booking", bookingRoutes);

router.use("/:offeringId/registration", registrationRoutes);

router.use("/:offeringId/enrollment", enrollmentRoutes);

router.use("/:offeringId/instructor", instructorRoutes);

export default router;
