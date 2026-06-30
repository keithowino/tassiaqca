import Staff from "../models/Staff.js";
import Business from "../models/Business.js";

// Get staff by business
export const getStaffByBusiness = async (req, res) => {
	try {
		const { businessId } = req.params;
		const staff = await Staff.find({ businessId, isActive: true })
			.populate("userId", "fullName email profileImage")
			.sort({ sortOrder: 1 });

		res.json(staff);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Create staff
export const createStaff = async (req, res) => {
	try {
		const { businessId, userId, role, title, specialization } = req.body;

		const business = await Business.findById(businessId);
		if (
			business.ownerId.toString() !== req.user._id.toString() &&
			req.user.role !== "admin"
		) {
			return res.status(403).json({ message: "Not authorized" });
		}

		const staff = await Staff.create({
			businessId,
			userId,
			role: role || "staff",
			title,
			specialization,
		});

		await staff.populate("userId", "fullName email profileImage");

		res.status(201).json(staff);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Update staff
export const updateStaff = async (req, res) => {
	try {
		const staff = await Staff.findById(req.params.id);
		if (!staff) {
			return res.status(404).json({ message: "Staff not found" });
		}

		const business = await Business.findById(staff.businessId);
		if (
			business.ownerId.toString() !== req.user._id.toString() &&
			req.user.role !== "admin"
		) {
			return res.status(403).json({ message: "Not authorized" });
		}

		const updated = await Staff.findByIdAndUpdate(req.params.id, req.body, {
			returnDocument: "after",
			runValidators: true,
		}).populate("userId", "fullName email profileImage");

		res.json(updated);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Delete staff
export const deleteStaff = async (req, res) => {
	try {
		const staff = await Staff.findById(req.params.id);
		if (!staff) {
			return res.status(404).json({ message: "Staff not found" });
		}

		const business = await Business.findById(staff.businessId);
		if (
			business.ownerId.toString() !== req.user._id.toString() &&
			req.user.role !== "admin"
		) {
			return res.status(403).json({ message: "Not authorized" });
		}

		await staff.deleteOne();
		res.json({ message: "Staff deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Update staff availability
export const updateStaffAvailability = async (req, res) => {
	try {
		const { availability } = req.body;
		const staff = await Staff.findById(req.params.id);
		if (!staff) {
			return res.status(404).json({ message: "Staff not found" });
		}

		const business = await Business.findById(staff.businessId);
		if (
			business.ownerId.toString() !== req.user._id.toString() &&
			req.user.role !== "admin"
		) {
			return res.status(403).json({ message: "Not authorized" });
		}

		staff.availability = availability;
		await staff.save();

		res.json(staff);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
