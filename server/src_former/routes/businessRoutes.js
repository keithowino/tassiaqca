// import express from "express";
// import {
// 	getAllBusinesses,
// 	getBusinessById,
// 	getBusinessBySlug,
// 	getMyBusinesses,
// 	createBusiness,
// 	updateBusiness,
// 	deleteBusiness,
// 	updateBusinessStatus,
// } from "../controllers/businessController.js";
// import { protect, adminOnly } from "../middleware/auth.js";

// const router = express.Router();

// // ========== PUBLIC ROUTES (no auth required) ==========
// // Get all businesses
// router.get("/", getAllBusinesses);

// // Get business by slug (public)
// router.get("/slug/:slug", getBusinessBySlug);

// // ========== PROTECTED ROUTES (authentication required) ==========
// // Apply authentication middleware to all routes below
// router.use(protect);

// // IMPORTANT: Specific routes MUST come before parameterized routes
// // Get user's own businesses
// router.get("/my", getMyBusinesses);

// // Create a new business
// router.post("/", createBusiness);

// // Parameterized routes (these must come AFTER specific routes)
// // Get business by ID
// router.get("/:id", getBusinessById);

// // Update business
// router.put("/:id", updateBusiness);

// // Delete business
// router.delete("/:id", deleteBusiness);

// // ========== ADMIN ONLY ROUTES ==========
// // Update business status (approve/reject)
// router.patch("/:id/status", adminOnly, updateBusinessStatus);

// export default router;

// ...

import express from "express";
import {
	getAllBusinesses,
	getBusinessById,
	getBusinessBySlug,
	getBusinessBySlugWithOfferings,
	getMyBusinesses,
	createBusiness,
	updateBusiness,
	deleteBusiness,
	updateBusinessStatus,
	getBusinessDashboardConfig,
	getBusinessAnalytics,
} from "../controllers/businessController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// ========== PUBLIC ROUTES (no auth required) ==========
router.get("/", getAllBusinesses);

// Get business by slug (public) - with offerings
router.get("/slug/:slug", getBusinessBySlugWithOfferings);

// ========== PROTECTED ROUTES (authentication required) ==========
router.use(protect);

router.get("/my", getMyBusinesses);
router.post("/", createBusiness);
router.get("/:id/dashboard", getBusinessDashboardConfig);
router.get("/:id/analytics", getBusinessAnalytics);
router.get("/:id", getBusinessById);
router.put("/:id", updateBusiness);
router.delete("/:id", deleteBusiness);

// ========== ADMIN ONLY ROUTES ==========
router.patch("/:id/status", adminOnly, updateBusinessStatus);

export default router;
