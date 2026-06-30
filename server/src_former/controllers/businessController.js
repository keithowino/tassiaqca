// import Business from "../models/Business.js";
// import Product from "../models/Product.js";

// // Get all businesses
// export const getAllBusinesses = async (req, res) => {
// 	try {
// 		const businesses = await Business.find({ isActive: true })
// 			.populate("ownerId", "fullName email")
// 			.sort({ createdAt: -1 });
// 		res.json(businesses);
// 	} catch (error) {
// 		res.status(500).json({ message: error.message });
// 	}
// };

// // Get business by slug (public)
// export const getBusinessBySlug = async (req, res) => {
// 	try {
// 		const business = await Business.findOne({
// 			slug: req.params.slug,
// 			isActive: true,
// 		}).populate("ownerId", "fullName email");

// 		if (!business) {
// 			return res.status(404).json({ message: "Business not found" });
// 		}

// 		// Increment view count
// 		await business.incrementViews();

// 		// Get products for this business
// 		const products = await Product.find({
// 			businessId: business._id,
// 			isAvailable: true,
// 		});

// 		res.json({ ...business.toObject(), products });
// 	} catch (error) {
// 		console.error("Get business by slug error:", error);
// 		res.status(500).json({ message: error.message });
// 	}
// };

// // Get user's businesses
// export const getMyBusinesses = async (req, res) => {
// 	try {
// 		const businesses = await Business.find({ ownerId: req.user._id });
// 		res.json(businesses);
// 	} catch (error) {
// 		res.status(500).json({ message: error.message });
// 	}
// };

// // Create business
// export const createBusiness = async (req, res) => {
// 	try {
// 		console.log("Creating business for user:", req.user._id);
// 		console.log("Request body:", req.body);

// 		const {
// 			businessName,
// 			tagline,
// 			description,
// 			category,
// 			email,
// 			phone,
// 			whatsapp,
// 			website,
// 			location,
// 			opening_time,
// 			closing_time,
// 			open_days,
// 			delivery_available,
// 			delivery_fee,
// 			min_order,
// 			coverImage,
// 			logo,
// 		} = req.body;

// 		// Validate required fields
// 		if (!businessName || !description || !category || !email || !phone) {
// 			return res.status(400).json({
// 				message:
// 					"Missing required fields: businessName, description, category, email, phone",
// 			});
// 		}

// 		// Create business
// 		const business = await Business.create({
// 			ownerId: req.user._id,
// 			businessName,
// 			tagline: tagline || "",
// 			description,
// 			category,
// 			email,
// 			phone,
// 			whatsapp: whatsapp || "",
// 			website: website || "",
// 			location: {
// 				address: location?.address || "",
// 				floor_unit: location?.floor_unit || "",
// 				location_label: location?.location_label || "Tassia Complex",
// 				coordinates: {
// 					lat: location?.coordinates?.lat || 0,
// 					lng: location?.coordinates?.lng || 0,
// 				},
// 			},
// 			opening_time: opening_time || "08:00",
// 			closing_time: closing_time || "20:00",
// 			open_days: open_days || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
// 			delivery_available: delivery_available || false,
// 			delivery_fee: delivery_fee || 0,
// 			min_order: min_order || 0,
// 			coverImage: coverImage || null,
// 			logo: logo || null,
// 			isActive: true,
// 			isVerified: false,
// 		});

// 		console.log("Business created successfully:", business._id);

// 		res.status(201).json(business);
// 	} catch (error) {
// 		console.error("Create business error:", error);
// 		console.error("Error details:", error.message);

// 		// Check for duplicate slug error
// 		if (error.code === 11000) {
// 			return res.status(400).json({
// 				message:
// 					"A business with this name already exists. Please use a different name.",
// 			});
// 		}

// 		res.status(500).json({
// 			message: error.message || "Failed to create business",
// 			error:
// 				process.env.NODE_ENV === "development"
// 					? error.stack
// 					: undefined,
// 		});
// 	}
// };

// // Get business by ID
// export const getBusinessById = async (req, res) => {
// 	try {
// 		const business = await Business.findById(req.params.id).populate(
// 			"ownerId",
// 			"fullName email profileImage",
// 		);

// 		if (!business) {
// 			return res.status(404).json({ message: "Business not found" });
// 		}

// 		res.json(business);
// 	} catch (error) {
// 		console.error("Get business error:", error);
// 		res.status(500).json({ message: error.message });
// 	}
// };

// // Update business
// export const updateBusiness = async (req, res) => {
// 	try {
// 		const business = await Business.findById(req.params.id);

// 		if (!business) {
// 			return res.status(404).json({ message: "Business not found" });
// 		}

// 		if (
// 			business.ownerId.toString() !== req.user._id.toString() &&
// 			req.user.role !== "admin"
// 		) {
// 			return res.status(403).json({ message: "Not authorized" });
// 		}

// 		const {
// 			businessName,
// 			tagline,
// 			description,
// 			category,
// 			email,
// 			phone,
// 			whatsapp,
// 			website,
// 			location,
// 			opening_time,
// 			closing_time,
// 			open_days,
// 			delivery_available,
// 			delivery_fee,
// 			min_order,
// 			coverImage,
// 			logo,
// 		} = req.body;

// 		// Prepare update data
// 		const updateData = {
// 			...(businessName && { businessName }),
// 			...(tagline !== undefined && { tagline }),
// 			...(description && { description }),
// 			...(category && { category }),
// 			...(email && { email }),
// 			...(phone && { phone }),
// 			...(whatsapp !== undefined && { whatsapp }),
// 			...(website !== undefined && { website }),
// 			...(opening_time && { opening_time }),
// 			...(closing_time && { closing_time }),
// 			...(open_days && { open_days }),
// 			...(delivery_available !== undefined && { delivery_available }),
// 			...(delivery_fee !== undefined && { delivery_fee }),
// 			...(min_order !== undefined && { min_order }),
// 			...(coverImage !== undefined && { coverImage }),
// 			...(logo !== undefined && { logo }),
// 		};

// 		// Handle location update separately with proper coordinate parsing
// 		if (location) {
// 			updateData.location = {
// 				address: location.address || business.location?.address || "",
// 				floor_unit:
// 					location.floor_unit || business.location?.floor_unit || "",
// 				location_label:
// 					location.location_label ||
// 					business.location?.location_label ||
// 					"Tassia Complex",
// 				coordinates: {
// 					lat:
// 						location.coordinates?.lat !== undefined
// 							? parseFloat(location.coordinates.lat)
// 							: business.location?.coordinates?.lat || 0,
// 					lng:
// 						location.coordinates?.lng !== undefined
// 							? parseFloat(location.coordinates.lng)
// 							: business.location?.coordinates?.lng || 0,
// 				},
// 			};
// 		}

// 		const updated = await Business.findByIdAndUpdate(
// 			req.params.id,
// 			updateData,
// 			{ returnDocument: "after", runValidators: true },
// 		);

// 		res.json(updated);
// 	} catch (error) {
// 		console.error("Update business error:", error);
// 		res.status(500).json({ message: error.message });
// 	}
// };

// // Delete business
// export const deleteBusiness = async (req, res) => {
// 	try {
// 		const business = await Business.findById(req.params.id);

// 		if (!business) {
// 			return res.status(404).json({ message: "Business not found" });
// 		}

// 		// Check if user owns the business or is admin
// 		if (
// 			business.ownerId.toString() !== req.user._id.toString() &&
// 			req.user.role !== "admin"
// 		) {
// 			return res.status(403).json({ message: "Not authorized" });
// 		}

// 		// Soft delete - just deactivate
// 		business.isActive = false;
// 		await business.save();

// 		res.json({ message: "Business deactivated successfully" });
// 	} catch (error) {
// 		console.error("Delete business error:", error);
// 		res.status(500).json({ message: error.message });
// 	}
// };

// // Update business status (admin only)
// export const updateBusinessStatus = async (req, res) => {
// 	try {
// 		const { status } = req.body;
// 		const business = await Business.findById(req.params.id);

// 		if (!business) {
// 			return res.status(404).json({ message: "Business not found" });
// 		}

// 		if (req.user.role !== "admin") {
// 			return res.status(403).json({ message: "Admin access required" });
// 		}

// 		// Fix: Use returnDocument: 'after' instead of new: true
// 		const updated = await Business.findByIdAndUpdate(
// 			req.params.id,
// 			{
// 				isVerified: status === "approved",
// 				isActive: status !== "rejected",
// 			},
// 			{ returnDocument: "after", runValidators: true },
// 		);

// 		res.json({
// 			message: `Business ${status} successfully`,
// 			business: updated,
// 		});
// 	} catch (error) {
// 		console.error("Update business status error:", error);
// 		res.status(500).json({ message: error.message });
// 	}
// };

// ...

import Business from "../models/Business.js";
import Offering from "../models/Offering.js";

// Helper function to generate slug
const generateSlug = (name) => {
	return (
		name
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/(^-|-$)/g, "") +
		"-" +
		Date.now().toString(36)
	);
};

// Get all businesses
export const getAllBusinesses = async (req, res) => {
	try {
		const businesses = await Business.find({ isActive: true })
			.populate("ownerId", "fullName email")
			.sort({ createdAt: -1 });
		res.json(businesses);
	} catch (error) {
		console.error("Get all businesses error:", error);
		res.status(500).json({ message: error.message });
	}
};

// Get business by slug (public)
export const getBusinessBySlug = async (req, res) => {
	try {
		const business = await Business.findOne({
			slug: req.params.slug,
			isActive: true,
		}).populate("ownerId", "fullName email");

		if (!business) {
			return res.status(404).json({ message: "Business not found" });
		}

		// Increment view count
		await business.incrementViews();

		// Get offerings for this business (replaces products)
		const offerings = await Offering.find({
			businessId: business._id,
			isAvailable: true,
		}).sort({ sortOrder: 1, createdAt: -1 });

		res.json({ ...business.toObject(), offerings });
	} catch (error) {
		console.error("Get business by slug error:", error);
		res.status(500).json({ message: error.message });
	}
};

// Get user's businesses
export const getMyBusinesses = async (req, res) => {
	try {
		const businesses = await Business.find({ ownerId: req.user._id });
		res.json(businesses);
	} catch (error) {
		console.error("Get my businesses error:", error);
		res.status(500).json({ message: error.message });
	}
};

// Create business (Enhanced with business type support)
export const createBusiness = async (req, res) => {
	try {
		console.log("Creating business for user:", req.user._id);
		console.log("Request body:", req.body);

		const {
			businessName,
			tagline,
			description,
			category,
			email,
			phone,
			whatsapp,
			website,
			location,
			opening_time,
			closing_time,
			open_days,
			delivery_available,
			delivery_fee,
			min_order,
			coverImage,
			logo,
			businessType,
			businessConfig,
			businessSettings,
		} = req.body;

		// Validate required fields
		if (!businessName || !description || !category || !email || !phone) {
			return res.status(400).json({
				message:
					"Missing required fields: businessName, description, category, email, phone",
			});
		}

		// Set default business type if not provided
		const type = businessType || "retail";

		// Load default config based on business type if not provided
		let config = businessConfig || {};
		if (!config || Object.keys(config).length === 0) {
			// Default config for each type
			const defaultConfigs = {
				retail: {
					hasInventory: true,
					hasProducts: true,
					hasDelivery: true,
				},
				food: {
					hasMenu: true,
					hasKitchen: true,
					hasDelivery: true,
					hasBookings: true,
					hasStaff: true,
				},
				professional: {
					hasServices: true,
					hasAppointments: true,
					hasQuotations: true,
					hasStaff: true,
					hasCalendar: true,
					hasPortfolio: true,
					hasSubscriptions: true,
				},
				trade: {
					hasServices: true,
					hasBookings: true,
					hasQuotations: true,
					hasStaff: true,
					hasPortfolio: true,
				},
				health: {
					hasServices: true,
					hasAppointments: true,
					hasStaff: true,
					hasCalendar: true,
				},
				beauty: {
					hasServices: true,
					hasAppointments: true,
					hasStaff: true,
					hasCalendar: true,
					hasPortfolio: true,
					hasSubscriptions: true,
				},
				education: {
					hasServices: true,
					hasBookings: true,
					hasStaff: true,
					hasCalendar: true,
					hasSubscriptions: true,
				},
				property: {
					hasRentals: true,
					hasStaff: true,
					hasListings: true,
					hasPortfolio: true,
				},
				logistics: {
					hasDelivery: true,
					hasDispatch: true,
					hasStaff: true,
					hasBookings: true,
				},
				agriculture: {
					hasInventory: true,
					hasProducts: true,
					hasDelivery: true,
					hasSubscriptions: true,
				},
				manufacturing: {
					hasInventory: true,
					hasProducts: true,
					hasQuotations: true,
					hasStaff: true,
					hasBookings: true,
				},
				digital: {
					hasServices: true,
					hasAppointments: true,
					hasQuotations: true,
					hasStaff: true,
					hasCalendar: true,
					hasPortfolio: true,
					hasSubscriptions: true,
				},
			};
			config = defaultConfigs[type] || defaultConfigs.retail;
		}

		// Create business with new fields
		const business = await Business.create({
			ownerId: req.user._id,
			businessName,
			tagline: tagline || "",
			description,
			category,
			email,
			phone,
			whatsapp: whatsapp || "",
			website: website || "",
			location: {
				address: location?.address || "",
				floor_unit: location?.floor_unit || "",
				location_label: location?.location_label || "Tassia Complex",
				coordinates: {
					lat: location?.coordinates?.lat || 0,
					lng: location?.coordinates?.lng || 0,
				},
			},
			opening_time: opening_time || "08:00",
			closing_time: closing_time || "20:00",
			open_days: open_days || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			delivery_available: delivery_available || false,
			delivery_fee: delivery_fee || 0,
			min_order: min_order || 0,
			coverImage: coverImage || null,
			logo: logo || null,
			isActive: true,
			isVerified: false,
			// NEW FIELDS
			businessType: type,
			businessConfig: config,
			businessSettings: businessSettings || {
				currency: "KES",
				taxRate: 16,
				deliveryRadius: 5,
				bookingLeadTime: 60,
				cancellationPolicy: "",
				paymentMethods: ["mpesa", "cash"],
				commissionRate: 0,
			},
			onboardingStatus: "completed",
			isOnboardingComplete: true,
			slug: generateSlug(businessName),
		});

		console.log("Business created successfully:", business._id);

		res.status(201).json(business);
	} catch (error) {
		console.error("Create business error:", error);
		console.error("Error details:", error.message);

		if (error.code === 11000) {
			return res.status(400).json({
				message:
					"A business with this name already exists. Please use a different name.",
			});
		}

		res.status(500).json({
			message: error.message || "Failed to create business",
			error:
				process.env.NODE_ENV === "development"
					? error.stack
					: undefined,
		});
	}
};

// Get business by ID
export const getBusinessById = async (req, res) => {
	try {
		const business = await Business.findById(req.params.id).populate(
			"ownerId",
			"fullName email profileImage",
		);

		if (!business) {
			return res.status(404).json({ message: "Business not found" });
		}

		res.json(business);
	} catch (error) {
		console.error("Get business by ID error:", error);
		res.status(500).json({ message: error.message });
	}
};

// Get business by slug (public) with offerings
export const getBusinessBySlugWithOfferings = async (req, res) => {
	try {
		const business = await Business.findOne({
			slug: req.params.slug,
			isActive: true,
		}).populate("ownerId", "fullName email");

		if (!business) {
			return res.status(404).json({ message: "Business not found" });
		}

		// Increment view count
		await business.incrementViews();

		// Get offerings for this business
		const offerings = await Offering.find({
			businessId: business._id,
			isAvailable: true,
		}).sort({ sortOrder: 1, createdAt: -1 });

		// Get business type info if available
		let businessTypeInfo = null;
		try {
			const BusinessType = await import("../models/BusinessType.js");
			businessTypeInfo = await BusinessType.default.findOne({
				code: business.businessType,
			});
		} catch (error) {
			console.log("BusinessType model not available yet");
		}

		res.json({
			...business.toObject(),
			offerings,
			businessTypeInfo,
		});
	} catch (error) {
		console.error("Get business by slug error:", error);
		res.status(500).json({ message: error.message });
	}
};

// Update business
export const updateBusiness = async (req, res) => {
	try {
		const business = await Business.findById(req.params.id);

		if (!business) {
			return res.status(404).json({ message: "Business not found" });
		}

		if (
			business.ownerId.toString() !== req.user._id.toString() &&
			req.user.role !== "admin"
		) {
			return res.status(403).json({ message: "Not authorized" });
		}

		const {
			businessName,
			tagline,
			description,
			category,
			email,
			phone,
			whatsapp,
			website,
			location,
			opening_time,
			closing_time,
			open_days,
			delivery_available,
			delivery_fee,
			min_order,
			coverImage,
			logo,
			businessType,
			businessConfig,
			businessSettings,
		} = req.body;

		// Prepare update data
		const updateData = {
			...(businessName && { businessName }),
			...(tagline !== undefined && { tagline }),
			...(description && { description }),
			...(category && { category }),
			...(email && { email }),
			...(phone && { phone }),
			...(whatsapp !== undefined && { whatsapp }),
			...(website !== undefined && { website }),
			...(opening_time && { opening_time }),
			...(closing_time && { closing_time }),
			...(open_days && { open_days }),
			...(delivery_available !== undefined && { delivery_available }),
			...(delivery_fee !== undefined && { delivery_fee }),
			...(min_order !== undefined && { min_order }),
			...(coverImage !== undefined && { coverImage }),
			...(logo !== undefined && { logo }),
			...(businessType && { businessType }),
			...(businessConfig && { businessConfig }),
			...(businessSettings && { businessSettings }),
		};

		// Handle location update separately with proper coordinate parsing
		if (location) {
			updateData.location = {
				address: location.address || business.location?.address || "",
				floor_unit:
					location.floor_unit || business.location?.floor_unit || "",
				location_label:
					location.location_label ||
					business.location?.location_label ||
					"Tassia Complex",
				coordinates: {
					lat:
						location.coordinates?.lat !== undefined
							? parseFloat(location.coordinates.lat)
							: business.location?.coordinates?.lat || 0,
					lng:
						location.coordinates?.lng !== undefined
							? parseFloat(location.coordinates.lng)
							: business.location?.coordinates?.lng || 0,
				},
			};
		}

		// If business name changed, update slug
		if (businessName && businessName !== business.businessName) {
			updateData.slug = generateSlug(businessName);
		}

		const updated = await Business.findByIdAndUpdate(
			req.params.id,
			updateData,
			{ returnDocument: "after", runValidators: true },
		);

		res.json(updated);
	} catch (error) {
		console.error("Update business error:", error);
		res.status(500).json({ message: error.message });
	}
};

// Delete business
export const deleteBusiness = async (req, res) => {
	try {
		const business = await Business.findById(req.params.id);

		if (!business) {
			return res.status(404).json({ message: "Business not found" });
		}

		if (
			business.ownerId.toString() !== req.user._id.toString() &&
			req.user.role !== "admin"
		) {
			return res.status(403).json({ message: "Not authorized" });
		}

		// Soft delete - just deactivate
		business.isActive = false;
		await business.save();

		res.json({ message: "Business deactivated successfully" });
	} catch (error) {
		console.error("Delete business error:", error);
		res.status(500).json({ message: error.message });
	}
};

// Update business status (admin only)
export const updateBusinessStatus = async (req, res) => {
	try {
		const { status } = req.body;
		const business = await Business.findById(req.params.id);

		if (!business) {
			return res.status(404).json({ message: "Business not found" });
		}

		if (req.user.role !== "admin") {
			return res.status(403).json({ message: "Admin access required" });
		}

		const updated = await Business.findByIdAndUpdate(
			req.params.id,
			{
				isVerified: status === "approved",
				isActive: status !== "rejected",
			},
			{ returnDocument: "after", runValidators: true },
		);

		res.json({
			message: `Business ${status} successfully`,
			business: updated,
		});
	} catch (error) {
		console.error("Update business status error:", error);
		res.status(500).json({ message: error.message });
	}
};

// Get business dashboard configuration
export const getBusinessDashboardConfig = async (req, res) => {
	try {
		const business = await Business.findById(req.params.id);
		if (!business) {
			return res.status(404).json({ message: "Business not found" });
		}

		if (
			business.ownerId.toString() !== req.user._id.toString() &&
			req.user.role !== "admin"
		) {
			return res.status(403).json({ message: "Not authorized" });
		}

		// Get business type info
		let businessTypeInfo = null;
		try {
			const BusinessType = await import("../models/BusinessType.js");
			businessTypeInfo = await BusinessType.default.findOne({
				code: business.businessType,
			});
		} catch (error) {
			console.log("BusinessType model not available yet");
		}

		// Get modules based on business type
		const modules = {
			shared: [
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
			business,
			businessType: businessTypeInfo,
			modules,
			config: business.businessConfig,
			settings: business.businessSettings,
		});
	} catch (error) {
		console.error("Get business dashboard config error:", error);
		res.status(500).json({ message: error.message });
	}
};

// Get business analytics
export const getBusinessAnalytics = async (req, res) => {
	try {
		const business = await Business.findById(req.params.id);
		if (!business) {
			return res.status(404).json({ message: "Business not found" });
		}

		if (
			business.ownerId.toString() !== req.user._id.toString() &&
			req.user.role !== "admin"
		) {
			return res.status(403).json({ message: "Not authorized" });
		}

		// Get offering count
		const offeringCount = await Offering.countDocuments({
			businessId: business._id,
			isAvailable: true,
		});

		// Get total offerings (including unavailable)
		const totalOfferings = await Offering.countDocuments({
			businessId: business._id,
		});

		res.json({
			businessId: business._id,
			businessName: business.businessName,
			businessType: business.businessType,
			viewCount: business.viewCount,
			averageRating: business.averageRating,
			reviewCount: business.reviewCount,
			offeringCount,
			totalOfferings,
			isVerified: business.isVerified,
			isActive: business.isActive,
			createdAt: business.createdAt,
		});
	} catch (error) {
		console.error("Get business analytics error:", error);
		res.status(500).json({ message: error.message });
	}
};
