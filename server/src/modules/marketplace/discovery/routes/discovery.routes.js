import { Router } from "express";

import {
	businessDiscoveryController,
	offeringDiscoveryController,
	trendingOfferingController,
} from "../controllers/index.js";

const router = Router();

router.get("/businesses", businessDiscoveryController.listBusinesses);
router.get("/offerings/featured", offeringDiscoveryController.listFeatured);
router.get("/offerings/trending", trendingOfferingController.listTrending);

export default router;
