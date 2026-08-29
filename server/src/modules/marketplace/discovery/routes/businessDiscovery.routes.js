import { Router } from "express";

import { businessDiscoveryController } from "../controllers/index.js";

const router = Router();

router.get("/", businessDiscoveryController.listBusinesses);

export default router;
