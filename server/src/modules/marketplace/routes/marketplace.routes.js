import { Router } from "express";

import { marketplaceController } from "../controllers/index.js";

import { discoveryRoutes } from "../discovery/index.js";
import { searchRoutes } from "../search/index.js";
import { marketplaceCategoryRoutes } from "../categories/index.js";
import {
	businessProfileRoutes,
	offeringProfileRoutes,
} from "../profiles/index.js";

const router = Router();

router.get("/offerings", marketplaceController.listOfferings);

router.use("/discovery", discoveryRoutes);

router.use("/search", searchRoutes);

router.use("/categories", marketplaceCategoryRoutes);

router.use("/profiles/businesses", businessProfileRoutes);

router.use("/profiles/offerings", offeringProfileRoutes);

export default router;
