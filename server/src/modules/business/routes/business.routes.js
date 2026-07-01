import { Router } from "express";

import businessController from "../controllers/business.controller.js";

import authenticate from "../../identity/middleware/authenticate.js";
import requirePermission from "../../identity/middleware/requirePermission.js";

const router = Router();

router.post("/", authenticate, businessController.create);
router.patch(
	"/:businessId",
	authenticate,
	requirePermission("BUSINESS_UPDATE"),
	businessController.update,
);

export default router;
