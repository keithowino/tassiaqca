import { Router } from "express";

import { authenticate, requirePermission } from "../../../../identity/index.js";

import { Permissions } from "../../../../../shared/index.js";

import { bookingController } from "../controllers/index.js";

const router = Router({
	mergeParams: true,
});

router.use(authenticate);

router.get(
	"/",
	requirePermission(Permissions.OFFERING_VIEW),
	bookingController.getBooking,
);

router.put(
	"/",
	requirePermission(Permissions.OFFERING_UPDATE),
	bookingController.setBooking,
);

export default router;
