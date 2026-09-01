import { Router } from "express";

import { offeringProfileController } from "../controllers/index.js";

const router = Router();

router.get("/:slug", offeringProfileController.getOfferingProfile);

export default router;
