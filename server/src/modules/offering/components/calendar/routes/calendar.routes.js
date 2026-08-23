import { Router } from "express";

import { authenticate, requirePermission } from "../../../../identity/index.js";

import { Permissions } from "../../../../../shared/index.js";

import { calendarController } from "../controllers/index.js";

const router = Router({
	mergeParams: true,
});

router.use(authenticate);

router.get(
	"/",
	requirePermission(Permissions.OFFERING_VIEW),
	calendarController.getCalendar,
);

router.put(
	"/",
	requirePermission(Permissions.OFFERING_UPDATE),
	calendarController.setCalendar,
);

export default router;
