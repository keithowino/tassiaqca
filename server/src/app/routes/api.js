import { Router } from "express";
import identityRoutes from "../../modules/identity/index.js";
import { platformRoutes } from "../../modules/platform/index.js";
import businessRoutes from "../../modules/business/index.js";
import { auditRoutes } from "../../modules/audit/index.js";
import commerceRoutes from "../../modules/commerce/index.js";
import { navigationRoutes } from "../../modules/navigation/index.js";
import { dashboardRoutes } from "../../modules/dashboard/index.js";
import { offeringRoutes } from "../../modules/offering/index.js";

const router = Router();

/**
 * Health check
 */
router.get("/health", (req, res) => {
	res.json({
		success: true,
		message: "API is healthy",
	});
});

router.use("/auth", identityRoutes);
router.use("/platform", platformRoutes);
router.use("/businesses", businessRoutes);
router.use("/businesses/:businessId/offerings", offeringRoutes);
router.use("/businesses/:businessId", navigationRoutes);
router.use("/businesses/:businessId", dashboardRoutes);
router.use("/businesses", commerceRoutes);
router.use("/", auditRoutes);

export default router;
