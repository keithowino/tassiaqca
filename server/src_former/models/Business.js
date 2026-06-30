// import mongoose from "mongoose";

// const businessSchema = new mongoose.Schema(
// 	{
// 		ownerId: {
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: "User",
// 			required: true,
// 		},
// 		businessName: {
// 			type: String,
// 			required: true,
// 			trim: true,
// 		},
// 		tagline: {
// 			type: String,
// 			default: "",
// 			trim: true,
// 			maxlength: 100,
// 		},
// 		slug: {
// 			type: String,
// 			unique: true,
// 			sparse: true,
// 		},
// 		description: {
// 			type: String,
// 			required: true,
// 			trim: true,
// 		},
// 		category: {
// 			type: String,
// 			required: true,
// 		},
// 		email: {
// 			type: String,
// 			required: true,
// 			lowercase: true,
// 			trim: true,
// 		},
// 		phone: {
// 			type: String,
// 			required: true,
// 			trim: true,
// 		},
// 		whatsapp: {
// 			type: String,
// 			default: "",
// 			trim: true,
// 		},
// 		website: {
// 			type: String,
// 			default: "",
// 			trim: true,
// 		},
// 		location: {
// 			address: {
// 				type: String,
// 				default: "",
// 			},
// 			floor_unit: {
// 				type: String,
// 				default: "",
// 			},
// 			location_label: {
// 				type: String,
// 				default: "Tassia Complex",
// 			},
// 			coordinates: {
// 				lat: { type: Number, default: null },
// 				lng: { type: Number, default: null },
// 			},
// 		},
// 		logo: {
// 			type: String,
// 			default: null,
// 		},
// 		coverImage: {
// 			type: String,
// 			default: null,
// 		},
// 		opening_time: {
// 			type: String,
// 			default: "08:00",
// 		},
// 		closing_time: {
// 			type: String,
// 			default: "20:00",
// 		},
// 		open_days: [
// 			{
// 				type: String,
// 				enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
// 			},
// 		],
// 		delivery_available: {
// 			type: Boolean,
// 			default: false,
// 		},
// 		delivery_fee: {
// 			type: Number,
// 			default: 0,
// 			min: 0,
// 		},
// 		min_order: {
// 			type: Number,
// 			default: 0,
// 			min: 0,
// 		},
// 		isActive: {
// 			type: Boolean,
// 			default: true,
// 		},
// 		isVerified: {
// 			type: Boolean,
// 			default: false,
// 		},
// 		viewCount: {
// 			type: Number,
// 			default: 0,
// 			min: 0,
// 		},
// 		averageRating: {
// 			type: Number,
// 			default: 0,
// 			min: 0,
// 			max: 5,
// 		},
// 		reviewCount: {
// 			type: Number,
// 			default: 0,
// 			min: 0,
// 		},
// 	},
// 	{
// 		timestamps: true,
// 	},
// );

// // Generate slug before validation
// businessSchema.pre("validate", function () {
// 	// Generate slug if not provided
// 	if (!this.slug && this.businessName) {
// 		let baseSlug = this.businessName
// 			.toLowerCase()
// 			.replace(/[^a-z0-9]+/g, "-")
// 			.replace(/^-|-$/g, "");

// 		// Add timestamp to ensure uniqueness
// 		this.slug = `${baseSlug}-${Date.now().toString(36)}`;
// 	}
// });

// // Method to increment view count
// businessSchema.methods.incrementViews = async function () {
// 	this.viewCount += 1;
// 	await this.save();
// 	return this.viewCount;
// };

// // Method to update rating (call this when a new review is added)
// businessSchema.methods.updateRating = async function (newRating) {
// 	const totalRating = this.averageRating * this.reviewCount;
// 	this.reviewCount += 1;
// 	this.averageRating = (totalRating + newRating) / this.reviewCount;
// 	await this.save();
// 	return this.averageRating;
// };

// export default mongoose.model("Business", businessSchema);

// ...

import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
	{
		// --- Core Fields (Existing) ---
		ownerId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		businessName: {
			type: String,
			required: true,
			trim: true,
		},
		tagline: {
			type: String,
			default: "",
			trim: true,
			maxlength: 100,
		},
		slug: {
			type: String,
			unique: true,
			sparse: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		category: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			lowercase: true,
			trim: true,
		},
		phone: {
			type: String,
			required: true,
			trim: true,
		},
		whatsapp: {
			type: String,
			default: "",
			trim: true,
		},
		website: {
			type: String,
			default: "",
			trim: true,
		},
		location: {
			address: { type: String, default: "" },
			floor_unit: { type: String, default: "" },
			location_label: { type: String, default: "Tassia Complex" },
			coordinates: {
				lat: { type: Number, default: null },
				lng: { type: Number, default: null },
			},
		},
		logo: {
			type: String,
			default: null,
		},
		coverImage: {
			type: String,
			default: null,
		},
		opening_time: {
			type: String,
			default: "08:00",
		},
		closing_time: {
			type: String,
			default: "20:00",
		},
		open_days: [
			{
				type: String,
				enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			},
		],
		delivery_available: {
			type: Boolean,
			default: false,
		},
		delivery_fee: {
			type: Number,
			default: 0,
			min: 0,
		},
		min_order: {
			type: Number,
			default: 0,
			min: 0,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		viewCount: {
			type: Number,
			default: 0,
			min: 0,
		},
		averageRating: {
			type: Number,
			default: 0,
			min: 0,
			max: 5,
		},
		reviewCount: {
			type: Number,
			default: 0,
			min: 0,
		},

		// --- NEW: Business Typing ---
		businessType: {
			type: String,
			enum: [
				"retail",
				"food",
				"professional",
				"trade",
				"health",
				"beauty",
				"education",
				"property",
				"logistics",
				"agriculture",
				"manufacturing",
				"digital",
			],
			required: true,
			default: "retail",
		},

		// --- NEW: Business Configuration (type-specific) ---
		businessConfig: {
			hasInventory: { type: Boolean, default: false },
			hasMenu: { type: Boolean, default: false },
			hasServices: { type: Boolean, default: false },
			hasAppointments: { type: Boolean, default: false },
			hasBookings: { type: Boolean, default: false },
			hasQuotations: { type: Boolean, default: false },
			hasDelivery: { type: Boolean, default: false },
			hasStaff: { type: Boolean, default: false },
			hasCalendar: { type: Boolean, default: false },
			hasKitchen: { type: Boolean, default: false },
			hasRentals: { type: Boolean, default: false },
			hasSubscriptions: { type: Boolean, default: false },
			hasProducts: { type: Boolean, default: false },
			hasPortfolio: { type: Boolean, default: false },
			hasDispatch: { type: Boolean, default: false },
			hasListings: { type: Boolean, default: false },
		},

		// --- NEW: Business Settings ---
		businessSettings: {
			currency: { type: String, default: "KES" },
			taxRate: { type: Number, default: 16 },
			deliveryRadius: { type: Number, default: 5 },
			bookingLeadTime: { type: Number, default: 60 }, // minutes
			cancellationPolicy: { type: String, default: "" },
			paymentMethods: { type: [String], default: ["mpesa", "cash"] },
			commissionRate: { type: Number, default: 0 }, // Platform commission
		},

		// --- NEW: Business Metadata ---
		businessMetadata: {
			// Store type-specific data as flexible JSON
			type: mongoose.Schema.Types.Mixed,
			default: {},
		},

		// --- NEW: Business Status ---
		onboardingStatus: {
			type: String,
			enum: ["pending", "in_progress", "completed"],
			default: "pending",
		},
		isOnboardingComplete: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);

// Generate slug before validation
businessSchema.pre("validate", function () {
	if (!this.slug && this.businessName) {
		let baseSlug = this.businessName
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/^-|-$/g, "");

		// Add timestamp to ensure uniqueness
		this.slug = `${baseSlug}-${Date.now().toString(36)}`;
	}
});

// Method to increment view count
businessSchema.methods.incrementViews = async function () {
	this.viewCount += 1;
	await this.save();
	return this.viewCount;
};

// Method to update rating
businessSchema.methods.updateRating = async function (newRating) {
	const totalRating = this.averageRating * this.reviewCount;
	this.reviewCount += 1;
	this.averageRating = (totalRating + newRating) / this.reviewCount;
	await this.save();
	return this.averageRating;
};

// Method to get dashboard modules
businessSchema.methods.getDashboardModules = function () {
	// This will be implemented with BusinessType model lookup
	return {
		shared: ["overview", "customers", "finance", "analytics", "settings"],
		commerce: this.getCommerceModules(),
		operations: this.getOperationsModules(),
	};
};

// Method to get commerce modules based on type
businessSchema.methods.getCommerceModules = function () {
	const modules = [];
	const config = this.businessConfig;

	if (config.hasProducts) modules.push("products");
	if (config.hasInventory) modules.push("inventory");
	if (config.hasMenu) modules.push("menu");
	if (config.hasServices) modules.push("services");
	if (config.hasPortfolio) modules.push("portfolio");
	if (config.hasRentals) modules.push("rentals");
	if (config.hasSubscriptions) modules.push("subscriptions");
	if (config.hasQuotations) modules.push("quotations");

	return modules;
};

// Method to get operations modules
businessSchema.methods.getOperationsModules = function () {
	const modules = [];
	const config = this.businessConfig;

	if (config.hasStaff) modules.push("staff");
	if (config.hasCalendar) modules.push("calendar");
	if (config.hasAppointments) modules.push("appointments");
	if (config.hasBookings) modules.push("bookings");
	if (config.hasKitchen) modules.push("kitchen");
	if (config.hasDispatch) modules.push("dispatch");
	if (config.hasListings) modules.push("listings");

	return modules;
};

export default mongoose.model("Business", businessSchema);
