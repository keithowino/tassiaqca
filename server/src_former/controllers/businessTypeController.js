import BusinessType from "../models/BusinessType.js";
import Business from "../models/Business.js";

// Get all business types
export const getAllBusinessTypes = async (req, res) => {
	try {
		const types = await BusinessType.find({ isActive: true }).sort({
			sortOrder: 1,
		});
		res.json(types);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get business type by code
export const getBusinessTypeByCode = async (req, res) => {
	try {
		const { code } = req.params;
		const type = await BusinessType.findOne({ code });
		if (!type) {
			return res.status(404).json({ message: "Business type not found" });
		}
		res.json(type);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get business type with module configuration for a specific business
export const getBusinessTypeWithModules = async (req, res) => {
	try {
		const { businessId } = req.params;

		// Get the business to find its type
		const business = await Business.findById(businessId);
		if (!business) {
			return res.status(404).json({ message: "Business not found" });
		}

		// Get the business type
		const type = await BusinessType.findOne({
			code: business.businessType,
		});
		if (!type) {
			return res.status(404).json({ message: "Business type not found" });
		}

		// Get dashboard modules based on business configuration
		const modules = {
			shared: type.modules.shared || [
				"overview",
				"customers",
				"finance",
				"analytics",
				"settings",
			],
			commerce: business.getCommerceModules(),
			operations: business.getOperationsModules(),
		};

		res.json({
			businessType: type,
			modules,
			config: business.businessConfig,
			settings: business.businessSettings,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
