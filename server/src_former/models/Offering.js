import mongoose from "mongoose";

const offeringSchema = new mongoose.Schema(
	{
		// --- Core ---
		businessId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Business",
			required: true,
		},
		type: {
			type: String,
			enum: [
				"product", // Physical products
				"service", // Services
				"meal", // Food items
				"rental", // Rentals
				"package", // Bundled offerings
				"membership", // Membership/subscription
				"booking", // Bookable service
				"course", // Educational course
				"digital", // Digital products
				"consultation", // Professional consultation
			],
			required: true,
			default: "product",
		},

		// --- Core Fields ---
		name: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		price: {
			type: Number,
			required: true,
			min: 0,
		},
		category: {
			type: String,
			required: true,
			trim: true,
		},
		images: [
			{
				type: String,
			},
		],
		isAvailable: {
			type: Boolean,
			default: true,
		},
		sortOrder: {
			type: Number,
			default: 0,
		},

		// --- Type-Specific Fields (Using Mixed) ---
		metadata: {
			type: mongoose.Schema.Types.Mixed,
			default: {},
		},

		// --- Pricing & Payment ---
		pricingModel: {
			type: String,
			enum: ["fixed", "hourly", "tiered", "subscription", "quote_based"],
			default: "fixed",
		},
		taxRate: {
			type: Number,
			default: 16,
		},

		// --- Availability ---
		availability: {
			type: mongoose.Schema.Types.Mixed,
			default: {},
		},

		// --- Inventory (for products) ---
		stock: {
			type: Number,
			default: 0,
		},
		sku: {
			type: String,
			trim: true,
		},

		// --- Service-specific ---
		duration: {
			type: Number, // in minutes
			default: null,
		},
		callOutFee: {
			type: Number,
			default: 0,
		},

		// --- Analytics ---
		viewCount: {
			type: Number,
			default: 0,
		},
		orderCount: {
			type: Number,
			default: 0,
		},

		// --- Status ---
		isFeatured: {
			type: Boolean,
			default: false,
		},
		isPublished: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	},
);

// Indexes for efficient queries
offeringSchema.index({ businessId: 1, type: 1 });
offeringSchema.index({ businessId: 1, isAvailable: 1 });
offeringSchema.index({ category: 1 });

// Method to get offering type label
offeringSchema.methods.getTypeLabel = function () {
	const labels = {
		product: "Product",
		service: "Service",
		meal: "Meal",
		rental: "Rental",
		package: "Package",
		membership: "Membership",
		booking: "Booking",
		course: "Course",
		digital: "Digital Product",
		consultation: "Consultation",
	};
	return labels[this.type] || this.type;
};

// Virtual for metadata schema validation
offeringSchema.virtual("isValidForType").get(function () {
	// Validate metadata based on offering type
	const type = this.type;
	const metadata = this.metadata || {};

	switch (type) {
		case "product":
			// Product should have stock info
			return true;
		case "meal":
			// Meal should have preparation time
			return true;
		case "service":
			// Service should have duration
			return true;
		default:
			return true;
	}
});

// Method to update offering stats
offeringSchema.methods.incrementViews = async function () {
	this.viewCount += 1;
	await this.save();
	return this.viewCount;
};

offeringSchema.methods.incrementOrders = async function () {
	this.orderCount += 1;
	await this.save();
	return this.orderCount;
};

export default mongoose.model("Offering", offeringSchema);
