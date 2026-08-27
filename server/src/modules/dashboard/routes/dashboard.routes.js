import { Router } from "express";

import { dashboardController } from "../controllers/index.js";

import { authenticate, requirePermission } from "../../identity/index.js";

import { Permissions } from "../../../shared/index.js";

const router = Router({ mergeParams: true });

router.use(authenticate);

router.get(
	"/dashboard",
	requirePermission(Permissions.BUSINESS_VIEW),
	dashboardController.getDashboard,
);

export default router;
