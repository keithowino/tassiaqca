import mongoose from "mongoose";

import {
	PRODUCT_VARIANT_STATUS,
	PRODUCT_VARIANT_STATUS_VALUES,
} from "../../../shared/constants/index.js";

/*
|--------------------------------------------------------------------------
| Sub Schemas
|--------------------------------------------------------------------------
*/

/**
 * Embedded variant attribute.
 *
 * This is intentionally modeled as a sub-document so it can later evolve
 * from primitive name/value pairs to Attribute and AttributeValue references
 * without changing the surrounding ProductVariant schema.
 */
const variantAttributeSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},

		value: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{
		_id: false,
	},
);

/*
|--------------------------------------------------------------------------
| Product Variant Schema
|--------------------------------------------------------------------------
*/

const productVariantSchema = new mongoose.Schema(
	{
		business: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Business",
			required: true,
			index: true,
		},

		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			required: true,
			index: true,
		},

		sku: {
			type: String,
			required: true,
			trim: true,
			uppercase: true,
		},

		slug: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
		},

		attributes: {
			type: [variantAttributeSchema],
			required: true,
			validate: {
				validator(attributes) {
					return attributes.length > 0;
				},
				message: "At least one variant attribute is required.",
			},
		},

		/**
		 * Cached for analytics and filtering.
		 * Maintained by the service layer.
		 */
		attributeCount: {
			type: Number,
			required: true,
			min: 1,
		},

		/**
		 * Canonical representation of the attribute combination.
		 *
		 * Example:
		 *
		 * color=black|ram=16gb|storage=512gb
		 *
		 * Used for duplicate detection.
		 *
		 * Maintained by the service layer.
		 */
		attributeSignature: {
			type: String,
			required: true,
			trim: true,
			select: false,
		},

		status: {
			type: String,
			enum: PRODUCT_VARIANT_STATUS_VALUES,
			default: PRODUCT_VARIANT_STATUS.ACTIVE,
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

/*
|--------------------------------------------------------------------------
| Indexes
|--------------------------------------------------------------------------
*/

/**
 * Product variants within a business.
 */
productVariantSchema.index({
	business: 1,
	product: 1,
});

/**
 * SKU uniqueness.
 */
productVariantSchema.index(
	{
		business: 1,
		sku: 1,
	},
	{
		unique: true,
	},
);

/**
 * Slug uniqueness.
 */
productVariantSchema.index(
	{
		business: 1,
		slug: 1,
	},
	{
		unique: true,
	},
);

/**
 * Prevent duplicate attribute combinations for the same product.
 */
productVariantSchema.index(
	{
		business: 1,
		product: 1,
		attributeSignature: 1,
	},
	{
		unique: true,
	},
);

/**
 * Business/status queries.
 */
productVariantSchema.index({
	business: 1,
	status: 1,
});

export default mongoose.model("ProductVariant", productVariantSchema);
