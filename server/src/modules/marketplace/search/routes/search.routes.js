import { Router } from "express";

import { searchOfferingController } from "../controllers/index.js";

const router = Router();

router.get("/offerings", searchOfferingController.searchOfferings);

export default router;
