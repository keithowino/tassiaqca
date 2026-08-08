import mongoose from "mongoose";

import {
	BILLING_MODEL_VALUES,
	BILLING_MODELS,
	CURRENCIES,
	CURRENCY_VALUES,
	OFFERING_PRICE_STATUS,
	OFFERING_PRICE_STATUS_VALUES,
} from "../../../../../shared/constants/index.js";

/**
 * #### Pricing Model V1
 *
 * Features such as multiple currencies, tiered pricing, promotions, taxes, regional pricing, and price histories can be layered on later without changing the core model.
 *
 * #### Immutable product pricing.
 *
 * Every price change creates a new document.
 * Existing records are never modified except for lifecycle fields
 * such as isCurrent/status/effectiveTo when superseded.
 */
const pricingSchema = new mongoose.Schema(
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

		amount: {
			type: mongoose.Schema.Types.Decimal128,
			required: true,
			min: 0,
		},

		costPrice: {
			type: mongoose.Schema.Types.Decimal128,
			default: null,
			min: 0,
		},

		currency: {
			type: String,
			enum: CURRENCY_VALUES,
			default: CURRENCIES.KES,
			required: true,
		},

		billingModel: {
			type: String,
			enum: BILLING_MODEL_VALUES,
			default: BILLING_MODELS.ONE_TIME,
		},

		effectiveFrom: {
			type: Date,
			default: Date.now,
			index: true,
		},

		effectiveTo: {
			type: Date,
			default: null,
		},

		isCurrent: {
			type: Boolean,
			default: true,
		},

		status: {
			type: String,
			enum: OFFERING_PRICE_STATUS_VALUES,
			default: OFFERING_PRICE_STATUS.ACTIVE,
			index: true,
		},

		changeReason: {
			type: String,
			trim: true,
			default: null,
		},

		metadata: {
			type: Map,
			of: mongoose.Schema.Types.Mixed,
			default: {},
		},

		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		updatedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			default: null,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

/*
|--------------------------------------------------------------------------
| Indexes
|--------------------------------------------------------------------------
*/

/**
 * Price history.
 */
pricingSchema.index({
	offering: 1,
	effectiveFrom: -1,
});

/**
 * Business queries.
 */
pricingSchema.index({
	business: 1,
	offering: 1,
});

/**
 * Ensure only one current price exists per product.
 */
pricingSchema.index(
	{
		offering: 1,
		isCurrent: 1,
	},
	{
		unique: true,
		partialFilterExpression: {
			isCurrent: true,
		},
	},
);

export default mongoose.model("Pricing", pricingSchema);
