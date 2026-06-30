import Offering from "../models/Offering.js";
import Business from "../models/Business.js";

// Get offerings for a business
export const getOfferingsByBusiness = async (req, res) => {
	try {
		const { businessId } = req.params;
		const { type, category, isAvailable } = req.query;

		// Build query
		const query = { businessId };
		if (type) query.type = type;
		if (category) query.category = category;
		if (isAvailable !== undefined)
			query.isAvailable = isAvailable === "true";

		const offerings = await Offering.find(query).sort({
			sortOrder: 1,
			createdAt: -1,
		});

		res.json(offerings);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get offering by ID
export const getOfferingById = async (req, res) => {
	try {
		const offering = await Offering.findById(req.params.id).populate(
			"businessId",
			"businessName slug",
		);

		if (!offering) {
			return res.status(404).json({ message: "Offering not found" });
		}

		res.json(offering);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Create offering
export const createOffering = async (req, res) => {
	try {
		const { businessId } = req.body;

		// Verify business exists and user owns it
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

		// Validate offering type matches business type capabilities
		const offeringType = req.body.type || "product";
		const configKey = `has${offeringType.charAt(0).toUpperCase() + offeringType.slice(1)}s`;

		// Check if business supports this offering type
		if (!business.businessConfig[configKey]) {
			return res.status(400).json({
				message: `This business does not support ${offeringType} offerings`,
			});
		}

		const offering = await Offering.create({
			...req.body,
			businessId,
		});

		res.status(201).json(offering);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Update offering
export const updateOffering = async (req, res) => {
	try {
		const offering = await Offering.findById(req.params.id);
		if (!offering) {
			return res.status(404).json({ message: "Offering not found" });
		}

		// Verify ownership
		const business = await Business.findById(offering.businessId);
		if (
			business.ownerId.toString() !== req.user._id.toString() &&
			req.user.role !== "admin"
		) {
			return res.status(403).json({ message: "Not authorized" });
		}

		const updated = await Offering.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ returnDocument: "after", runValidators: true },
		);

		res.json(updated);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Delete offering
export const deleteOffering = async (req, res) => {
	try {
		const offering = await Offering.findById(req.params.id);
		if (!offering) {
			return res.status(404).json({ message: "Offering not found" });
		}

		const business = await Business.findById(offering.businessId);
		if (
			business.ownerId.toString() !== req.user._id.toString() &&
			req.user.role !== "admin"
		) {
			return res.status(403).json({ message: "Not authorized" });
		}

		await offering.deleteOne();
		res.json({ message: "Offering deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Bulk create offerings
export const bulkCreateOfferings = async (req, res) => {
	try {
		const { businessId, offerings } = req.body;

		if (!offerings || !Array.isArray(offerings) || offerings.length === 0) {
			return res.status(400).json({ message: "Invalid offerings data" });
		}

		const business = await Business.findById(businessId);
		if (
			business.ownerId.toString() !== req.user._id.toString() &&
			req.user.role !== "admin"
		) {
			return res.status(403).json({ message: "Not authorized" });
		}

		const created = await Offering.insertMany(
			offerings.map((o) => ({ ...o, businessId })),
		);

		res.status(201).json({
			message: `Created ${created.length} offerings`,
			offerings: created,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
