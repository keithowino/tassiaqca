import mongoose from "mongoose";

import {
	INVENTORY_STATUS,
	INVENTORY_STATUS_VALUES,
} from "../../../../../shared/index.js";

const offeringInventorySchema = new mongoose.Schema(
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

		/**
		 * Optional variant target.
		 *
		 * When null, the inventory belongs to the Offering itself.
		 * When present, the inventory belongs to a specific Offering Variant.
		 */
		variant: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "OfferingVariant",
			default: null,
			index: true,
		},

		quantity: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
		},

		reservedQuantity: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
		},

		lowStockThreshold: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
		},

		allowBackorder: {
			type: Boolean,
			default: false,
		},

		status: {
			type: String,
			enum: INVENTORY_STATUS_VALUES,
			default: INVENTORY_STATUS.ACTIVE,
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
 * One offering-level inventory record.
 */
offeringInventorySchema.index(
	{
		business: 1,
		offering: 1,
	},
	{
		unique: true,
		partialFilterExpression: {
			variant: null,
		},
	},
);

/**
 * One inventory record per variant.
 */
offeringInventorySchema.index(
	{
		business: 1,
		offering: 1,
		variant: 1,
	},
	{
		unique: true,
		partialFilterExpression: {
			variant: {
				$exists: true,
				$ne: null,
			},
		},
	},
);

offeringInventorySchema.index({
	business: 1,
	status: 1,
});

offeringInventorySchema.index({
	offering: 1,
	status: 1,
});

const OfferingInventory =
	mongoose.models.OfferingInventory ||
	mongoose.model("OfferingInventory", offeringInventorySchema);

export default OfferingInventory;
