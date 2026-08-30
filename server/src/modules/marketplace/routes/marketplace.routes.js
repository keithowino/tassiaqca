import { Router } from "express";

import { marketplaceController } from "../controllers/index.js";

import { discoveryRoutes } from "../discovery/index.js";
import { searchRoutes } from "../search/index.js";

const router = Router();

router.get("/offerings", marketplaceController.listOfferings);

router.use("/discovery", discoveryRoutes);

router.use("/search", searchRoutes);

export default router;
