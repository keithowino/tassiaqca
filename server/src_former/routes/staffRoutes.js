import express from "express";
import {
	getStaffByBusiness,
	createStaff,
	updateStaff,
	deleteStaff,
	updateStaffAvailability,
} from "../controllers/staffController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);
router.get("/business/:businessId", getStaffByBusiness);
router.post("/", createStaff);
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff);
router.patch("/:id/availability", updateStaffAvailability);

export default router;
