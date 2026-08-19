import mongoose from "mongoose";

import {
	OFFERING_VARIANT_STATUS,
	OFFERING_VARIANT_STATUS_VALUES,
} from "../../../../../shared/index.js";

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

const offeringVariantSchema = new mongoose.Schema(
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
			enum: OFFERING_VARIANT_STATUS_VALUES,
			default: OFFERING_VARIANT_STATUS.ACTIVE,
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
		versionKey: false,
	},
);

/**
 * Offering variants within a business.
 */
offeringVariantSchema.index({
	business: 1,
	offering: 1,
});

/**
 * SKU uniqueness.
 */
offeringVariantSchema.index(
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
offeringVariantSchema.index(
	{
		offering: 1,
		slug: 1,
	},
	{
		unique: true,
	},
);

/**
 * Prevent duplicate attribute combinations for the same offering.
 */
offeringVariantSchema.index(
	{
		offering: 1,
		attributeSignature: 1,
	},
	{
		unique: true,
	},
);

/**
 * Business/status queries.
 */
offeringVariantSchema.index({
	business: 1,
	status: 1,
});

export const OfferingVariant =
	mongoose.models.OfferingVariant ||
	mongoose.model("OfferingVariant", offeringVariantSchema);

export default OfferingVariant;
