import mongoose from "mongoose";

import {
	CURRENCIES,
	CURRENCY_VALUES,
	PRODUCT_PRICE_STATUS,
	PRODUCT_PRICE_STATUS_VALUES,
} from "../../../shared/constants/index.js";

/**
 * Immutable product pricing.
 *
 * Every price change creates a new document.
 * Existing records are never modified except for lifecycle fields
 * such as isCurrent/status/effectiveTo when superseded.
 */
const productPriceSchema = new mongoose.Schema(
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

		sellingPrice: {
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
			enum: PRODUCT_PRICE_STATUS_VALUES,
			default: PRODUCT_PRICE_STATUS.ACTIVE,
			index: true,
		},

		changeReason: {
			type: String,
			trim: true,
			default: null,
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
 * Price history.
 */
productPriceSchema.index({
	product: 1,
	effectiveFrom: -1,
});

/**
 * Business queries.
 */
productPriceSchema.index({
	business: 1,
	product: 1,
});

/**
 * Ensure only one current price exists per product.
 */
productPriceSchema.index(
	{
		product: 1,
		isCurrent: 1,
	},
	{
		unique: true,
		partialFilterExpression: {
			isCurrent: true,
		},
	},
);

export default mongoose.model("ProductPrice", productPriceSchema);
