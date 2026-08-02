import mongoose from "mongoose";
import {
	PRODUCT_STATUS,
	PRODUCT_STATUS_VALUES,
} from "../../../shared/constants/index.js";

/**
 * This model intentionally does not include:
 * - Product image
 * - Gallery
 * - Product variants
 * - Inventory
 * - Pricing history
 * - Branch stock
 * - Discounts
 * - Taxes
 */
const productSchema = new mongoose.Schema(
	{
		business: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Business",
			required: true,
			index: true,
		},

		offering: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Offering",
			required: true,
			unique: true,
			index: true,
		},

		slug: {
			type: String,
			required: true,
			trim: true,
		},

		name: {
			type: String,
			required: true,
			trim: true,
			maxlength: 150,
		},

		shortDescription: {
			type: String,
			trim: true,
			maxlength: 300,
			default: "",
		},

		description: {
			type: String,
			trim: true,
			default: "",
		},

		sku: {
			type: String,
			trim: true,
		},

		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "ProductCategory",
			default: null,
		},

		status: {
			type: String,
			enum: PRODUCT_STATUS_VALUES,
			default: PRODUCT_STATUS.ACTIVE,
			index: true,
		},

		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		updatedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

/**
 * Unique product name within a business
 */
productSchema.index(
	{ business: 1, name: 1 },
	{
		unique: true,
	},
);

/**
 * Unique slug within a business
 */
productSchema.index(
	{ business: 1, slug: 1 },
	{
		unique: true,
	},
);

/**
 * Unique SKU within a business (when provided)
 */
productSchema.index(
	{ business: 1, sku: 1 },
	{
		unique: true,
		sparse: true,
	},
);

export default mongoose.model("Product", productSchema);
