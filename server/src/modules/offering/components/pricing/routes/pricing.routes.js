import { Router } from "express";

import pricingController from "../controllers/pricing.controller.js";

import { requirePermission } from "../../../../identity/index.js";

import { Permissions } from "../../../../../shared/index.js";

const router = Router({
	mergeParams: true,
});

router.get(
	"/",
	requirePermission(Permissions.OFFERING_VIEW),
	pricingController.getCurrentPricing,
);

router.put(
	"/",
	requirePermission(Permissions.OFFERING_UPDATE),
	pricingController.setCurrentPricing,
);

router.get(
	"/history",
	requirePermission(Permissions.OFFERING_VIEW),
	pricingController.getPricingHistory,
);

export default router;
