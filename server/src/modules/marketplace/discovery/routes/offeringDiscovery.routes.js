import { Router } from "express";

import { offeringDiscoveryController } from "../controllers/index.js";

const router = Router();

router.get("/offerings/featured", offeringDiscoveryController.listFeatured);

export default router;
