import { Router } from "express";

import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
// import inventoryRoutes from "./routes/inventory.routes.js";
// import stockMovementRoutes from "./routes/stockMovement.routes.js";
// import productImageRoutes from "./routes/productImage.routes.js";
// import productPriceRoutes from "./routes/productPrice.routes.js";

const router = Router();

router.use("/:businessId/products", productRoutes);
// router.use("/:businessId/product-images", productImageRoutes);
// router.use("/:businessId/product-prices", productPriceRoutes);
router.use("/:businessId/categories", categoryRoutes);
// router.use("/:businessId/inventory", inventoryRoutes);
// router.use("/:businessId/stock-movements", stockMovementRoutes);

export default router;
