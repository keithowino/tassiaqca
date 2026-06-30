import express from "express";
import {
	getOfferingsByBusiness,
	getOfferingById,
	createOffering,
	updateOffering,
	deleteOffering,
	bulkCreateOfferings,
} from "../controllers/offeringController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/business/:businessId", getOfferingsByBusiness);
router.get("/:id", getOfferingById);

// Protected routes
router.use(protect);
router.post("/", createOffering);
router.post("/bulk", bulkCreateOfferings);
router.put("/:id", updateOffering);
router.delete("/:id", deleteOffering);

export default router;
