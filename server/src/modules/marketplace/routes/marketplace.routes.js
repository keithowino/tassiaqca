import { Router } from "express";

import { marketplaceController } from "../controllers/index.js";
import { businessDiscoveryRoutes } from "../discovery/index.js";

const router = Router();

router.get("/offerings", marketplaceController.listOfferings);
router.use("/businesses", businessDiscoveryRoutes);

export default router;
