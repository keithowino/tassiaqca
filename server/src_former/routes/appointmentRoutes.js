import express from "express";
import {
	getAppointments,
	getAppointmentById,
	createAppointment,
	updateAppointment,
	deleteAppointment,
	updateAppointmentStatus,
	getAppointmentsByStaff,
	getAppointmentsByClient,
} from "../controllers/appointmentController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);
router.get("/business/:businessId", getAppointments);
router.get("/staff/:staffId", getAppointmentsByStaff);
router.get("/client", getAppointmentsByClient);
router.post("/", createAppointment);
router.get("/:id", getAppointmentById);
router.put("/:id", updateAppointment);
router.patch("/:id/status", updateAppointmentStatus);
router.delete("/:id", deleteAppointment);

export default router;
