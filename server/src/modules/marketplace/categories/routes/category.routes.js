import { Router } from "express";

import { marketplaceCategoryController } from "../controllers/index.js";

const router = Router();

router.get("/", marketplaceCategoryController.listCategories);

export default router;
