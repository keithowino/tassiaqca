import { Router } from "express";

import { businessProfileController } from "../controllers/index.js";

const router = Router();

router.get("/:slug", businessProfileController.getBusinessProfile);

export default router;
