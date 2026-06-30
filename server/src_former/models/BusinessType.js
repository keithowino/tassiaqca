import mongoose from "mongoose";

const businessTypeSchema = new mongoose.Schema(
	{
		// Core identifier
		code: {
			type: String,
			required: true,
			unique: true,
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
		},
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		icon: {
			type: String,
			default: "Store",
		},

		// Business configuration
		config: {
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

		// Dashboard modules configuration
		modules: {
			shared: {
				type: [String],
				default: [
					"overview",
					"customers",
					"finance",
					"analytics",
					"settings",
				],
			},
			commerce: {
				type: [String],
				default: [],
			},
			operations: {
				type: [String],
				default: [],
			},
		},

		// Required fields for this business type
		requiredFields: {
			type: [String],
			default: [
				"businessName",
				"description",
				"category",
				"email",
				"phone",
			],
		},

		// Optional fields for this business type
		optionalFields: {
			type: [String],
			default: ["website", "whatsapp", "location", "opening_hours"],
		},

		// Payment models supported
		paymentModels: {
			type: [String],
			enum: [
				"one_time",
				"hourly",
				"subscription",
				"installment",
				"quote_based",
			],
			default: ["one_time"],
		},

		// Delivery options supported
		deliveryOptions: {
			type: [String],
			enum: ["pickup", "local_delivery", "shipping", "on_site", "online"],
			default: ["pickup"],
		},

		isActive: {
			type: Boolean,
			default: true,
		},

		sortOrder: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	},
);

// Create slug from name
businessTypeSchema.pre("save", function () {
	if (this.isModified("name") && !this.slug) {
		this.slug = this.name
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/^-|-$/g, "");
	}
});

// Method to get module list
businessTypeSchema.methods.getModules = function () {
	return {
		shared: this.modules.shared || [],
		commerce: this.modules.commerce || [],
		operations: this.modules.operations || [],
	};
};

// Method to check if business type has a feature
businessTypeSchema.methods.hasFeature = function (feature) {
	return this.config[feature] === true;
};

export default mongoose.model("BusinessType", businessTypeSchema);
