import { Router } from "express";

import { searchController } from "../controllers/index.js";

const router = Router();

router.get("/offerings", searchController.searchOfferings);

router.get("/businesses", searchController.searchBusinesses);

export default router;
