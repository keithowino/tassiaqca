import { Router } from "express";

import { businessTypeController } from "../controllers/index.js";

const router = Router();

router.get("/business-types", businessTypeController.list);

export default router;
