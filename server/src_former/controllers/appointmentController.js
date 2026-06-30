import Appointment from "../models/Appointment.js";
import Business from "../models/Business.js";
import Offering from "../models/Offering.js";
import Staff from "../models/Staff.js";

// Helper function to calculate end time
const calculateEndTime = (startTime, duration) => {
	const [hours, minutes] = startTime.split(":").map(Number);
	const totalMinutes = hours * 60 + minutes + duration;
	const endHours = Math.floor(totalMinutes / 60);
	const endMinutes = totalMinutes % 60;
	return `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`;
};

// Get appointments for a business
export const getAppointments = async (req, res) => {
	try {
		const { businessId } = req.params;
		const { status, dateFrom, dateTo, staffId } = req.query;

		// Verify business ownership
		const business = await Business.findById(businessId);
		if (!business) {
			return res.status(404).json({ message: "Business not found" });
		}

		if (
			business.ownerId.toString() !== req.user._id.toString() &&
			req.user.role !== "admin"
		) {
			return res.status(403).json({ message: "Not authorized" });
		}

		const query = { businessId };
		if (status) query.status = status;
		if (staffId) query.staffId = staffId;
		if (dateFrom || dateTo) {
			query.date = {};
			if (dateFrom) query.date.$gte = new Date(dateFrom);
			if (dateTo) query.date.$lte = new Date(dateTo);
		}

		const appointments = await Appointment.find(query)
			.populate("clientId", "fullName email phoneNumber profileImage")
			.populate("staffId", "title userId")
			.populate("offeringId", "name price duration category")
			.sort({ date: 1, startTime: 1 });

		res.json(appointments);
	} catch (error) {
		console.error("Get appointments error:", error);
		res.status(500).json({ message: error.message });
	}
};

// Get appointment by ID
export const getAppointmentById = async (req, res) => {
	try {
		const appointment = await Appointment.findById(req.params.id)
			.populate("clientId", "fullName email phoneNumber profileImage")
			.populate("staffId", "title userId")
			.populate("offeringId", "name price duration category");

		if (!appointment) {
			return res.status(404).json({ message: "Appointment not found" });
		}

		// Verify business ownership
		const business = await Business.findById(appointment.businessId);
		if (
			business.ownerId.toString() !== req.user._id.toString() &&
			req.user.role !== "admin"
		) {
			return res.status(403).json({ message: "Not authorized" });
		}

		res.json(appointment);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Create appointment
export const createAppointment = async (req, res) => {
	try {
		const {
			businessId,
			clientId,
			offeringId,
			staffId,
			date,
			startTime,
			duration,
			notes,
			clientNotes,
			price,
		} = req.body;

		// Verify business
		const business = await Business.findById(businessId);
		if (!business) {
			return res.status(404).json({ message: "Business not found" });
		}

		if (
			business.ownerId.toString() !== req.user._id.toString() &&
			req.user.role !== "admin"
		) {
			return res.status(403).json({ message: "Not authorized" });
		}

		// Verify offering
		const offering = await Offering.findById(offeringId);
		if (!offering) {
			return res.status(404).json({ message: "Offering not found" });
		}

		// Verify staff if provided
		if (staffId) {
			const staff = await Staff.findById(staffId);
			if (!staff) {
				return res.status(404).json({ message: "Staff not found" });
			}
			if (staff.businessId.toString() !== businessId) {
				return res.status(400).json({
					message: "Staff does not belong to this business",
				});
			}
		}

		// Check for availability conflict
		const conflictQuery = {
			businessId,
			date: new Date(date),
			startTime,
			status: { $nin: ["cancelled", "completed"] },
		};
		if (staffId) {
			conflictQuery.staffId = staffId;
		}

		const existingAppointment = await Appointment.findOne(conflictQuery);
		if (existingAppointment) {
			return res.status(409).json({
				message: "Time slot is already booked",
			});
		}

		const appointmentDuration = duration || offering.duration || 60;
		const endTime = calculateEndTime(startTime, appointmentDuration);
		const finalPrice = price || offering.price || 0;

		const appointment = await Appointment.create({
			businessId,
			clientId: clientId || req.user._id,
			offeringId,
			staffId: staffId || null,
			date: new Date(date),
			startTime,
			endTime,
			duration: appointmentDuration,
			price: finalPrice,
			notes,
			clientNotes,
			status: "pending",
			paymentStatus: "pending",
		});

		await appointment.populate(
			"clientId",
			"fullName email phoneNumber profileImage",
		);
		await appointment.populate("staffId", "title userId");
		await appointment.populate("offeringId", "name price duration");

		res.status(201).json(appointment);
	} catch (error) {
		console.error("Create appointment error:", error);
		res.status(500).json({ message: error.message });
	}
};

// Update appointment
export const updateAppointment = async (req, res) => {
	try {
		const appointment = await Appointment.findById(req.params.id);
		if (!appointment) {
			return res.status(404).json({ message: "Appointment not found" });
		}

		const business = await Business.findById(appointment.businessId);
		if (
			business.ownerId.toString() !== req.user._id.toString() &&
			req.user.role !== "admin"
		) {
			return res.status(403).json({ message: "Not authorized" });
		}

		// If time is changing, check for conflicts
		if (req.body.date || req.body.startTime || req.body.staffId) {
			const conflictQuery = {
				businessId: appointment.businessId,
				date: new Date(req.body.date || appointment.date),
				startTime: req.body.startTime || appointment.startTime,
				status: { $nin: ["cancelled", "completed"] },
				_id: { $ne: appointment._id },
			};
			if (req.body.staffId || appointment.staffId) {
				conflictQuery.staffId = req.body.staffId || appointment.staffId;
			}

			const existingAppointment =
				await Appointment.findOne(conflictQuery);
			if (existingAppointment) {
				return res.status(409).json({
					message: "Time slot is already booked",
				});
			}
		}

		const updated = await Appointment.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ returnDocument: "after", runValidators: true },
		)
			.populate("clientId", "fullName email phoneNumber profileImage")
			.populate("staffId", "title userId")
			.populate("offeringId", "name price duration");

		res.json(updated);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Update appointment status
export const updateAppointmentStatus = async (req, res) => {
	try {
		const { status, notes } = req.body;
		const appointment = await Appointment.findById(req.params.id);
		if (!appointment) {
			return res.status(404).json({ message: "Appointment not found" });
		}

		const business = await Business.findById(appointment.businessId);
		if (
			business.ownerId.toString() !== req.user._id.toString() &&
			req.user.role !== "admin"
		) {
			return res.status(403).json({ message: "Not authorized" });
		}

		appointment.status = status;
		if (notes) appointment.notes = notes;
		await appointment.save();

		await appointment.populate("clientId", "fullName email phoneNumber");
		await appointment.populate("offeringId", "name price");

		res.json(appointment);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Delete appointment
export const deleteAppointment = async (req, res) => {
	try {
		const appointment = await Appointment.findById(req.params.id);
		if (!appointment) {
			return res.status(404).json({ message: "Appointment not found" });
		}

		const business = await Business.findById(appointment.businessId);
		if (
			business.ownerId.toString() !== req.user._id.toString() &&
			req.user.role !== "admin"
		) {
			return res.status(403).json({ message: "Not authorized" });
		}

		await appointment.deleteOne();
		res.json({ message: "Appointment deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get appointments by staff member
export const getAppointmentsByStaff = async (req, res) => {
	try {
		const { staffId } = req.params;
		const { dateFrom, dateTo } = req.query;

		const staff = await Staff.findById(staffId);
		if (!staff) {
			return res.status(404).json({ message: "Staff not found" });
		}

		const query = { staffId };
		if (dateFrom || dateTo) {
			query.date = {};
			if (dateFrom) query.date.$gte = new Date(dateFrom);
			if (dateTo) query.date.$lte = new Date(dateTo);
		}

		const appointments = await Appointment.find(query)
			.populate("clientId", "fullName email phoneNumber")
			.populate("offeringId", "name price duration")
			.sort({ date: 1, startTime: 1 });

		res.json(appointments);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get appointments by client
export const getAppointmentsByClient = async (req, res) => {
	try {
		const clientId = req.user._id;
		const { status, dateFrom, dateTo } = req.query;

		const query = { clientId };
		if (status) query.status = status;
		if (dateFrom || dateTo) {
			query.date = {};
			if (dateFrom) query.date.$gte = new Date(dateFrom);
			if (dateTo) query.date.$lte = new Date(dateTo);
		}

		const appointments = await Appointment.find(query)
			.populate("businessId", "businessName slug logo")
			.populate("staffId", "title userId")
			.populate("offeringId", "name price duration")
			.sort({ date: 1, startTime: 1 });

		res.json(appointments);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
