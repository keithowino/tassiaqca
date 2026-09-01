import { Router } from "express";

import productRoutes from "./product.routes.js";
import categoryRoutes from "./category.routes.js";

const router = Router();

router.use("/:businessId/products", productRoutes);
router.use("/:businessId/categories", categoryRoutes);

export default router;
