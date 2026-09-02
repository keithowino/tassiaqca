import { Router } from "express";

import { businessProfileRoutes } from "./businesses/index.js";
import { offeringProfileRoutes } from "./offerings/index.js";

const router = Router();

router.use("/businesses", businessProfileRoutes);

router.use("/offerings", offeringProfileRoutes);

export default router;
