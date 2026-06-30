import express from "express";
import {
	getAllBusinessTypes,
	getBusinessTypeByCode,
	getBusinessTypeWithModules,
} from "../controllers/businessTypeController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getAllBusinessTypes);
router.get("/code/:code", getBusinessTypeByCode);

// Protected routes
router.use(protect);
router.get("/business/:businessId/modules", getBusinessTypeWithModules);

export default router;
