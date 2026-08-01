import mongoose from "mongoose";

import {
	INVENTORY_STATUS,
	INVENTORY_STATUS_VALUES,
} from "../../../shared/constants/index.js";

const inventorySchema = new mongoose.Schema(
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
	},
);

/**
 * One inventory record per product within a business.
 */
inventorySchema.index(
	{
		business: 1,
		product: 1,
	},
	{
		unique: true,
	},
);

export default mongoose.model("Inventory", inventorySchema);
