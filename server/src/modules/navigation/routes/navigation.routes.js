import { Router } from "express";

import { navigationController } from "../controllers/index.js";

import { authenticate, requirePermission } from "../../identity/index.js";

import { Permissions } from "../../../shared/index.js";

const router = Router({ mergeParams: true });

router.use(authenticate);

router.get(
	"/navigation",
	requirePermission(Permissions.BUSINESS_VIEW),
	navigationController.getNavigation,
);

export default router;
