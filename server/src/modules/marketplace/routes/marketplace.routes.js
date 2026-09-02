import { Router } from "express";

import { marketplaceController } from "../controllers/index.js";

import { discoveryRoutes } from "../discovery/index.js";
import { searchRoutes } from "../search/index.js";
import { marketplaceCategoryRoutes } from "../categories/index.js";
import { profilesRoutes } from "../profiles/index.js";

const router = Router();

router.get("/offerings", marketplaceController.listOfferings);

router.use("/discovery", discoveryRoutes);

router.use("/search", searchRoutes);

router.use("/categories", marketplaceCategoryRoutes);

router.use("/profiles", profilesRoutes);

export default router;
