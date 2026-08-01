import mongoose from "mongoose";

import {
	STOCK_MOVEMENT_STATUS,
	STOCK_MOVEMENT_STATUS_VALUES,
	STOCK_MOVEMENT_TYPES,
} from "../../../shared/constants/index.js";

const stockMovementSchema = new mongoose.Schema(
	{
		business: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Business",
			required: true,
			index: true,
		},

		inventory: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Inventory",
			required: true,
			index: true,
		},

		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			required: true,
			index: true,
		},

		type: {
			type: String,
			enum: STOCK_MOVEMENT_TYPES,
			required: true,
			index: true,
		},

		/**
		 * Positive integer representing the movement amount.
		 * Whether it increases or decreases inventory is determined
		 * by the movement type.
		 */
		quantity: {
			type: Number,
			required: true,
			min: 1,
		},

		/**
		 * Inventory quantity before this movement.
		 */
		quantityBefore: {
			type: Number,
			required: true,
			min: 0,
		},

		/**
		 * Inventory quantity after this movement.
		 */
		quantityAfter: {
			type: Number,
			required: true,
			min: 0,
		},

		reason: {
			type: String,
			required: true,
			trim: true,
			maxlength: 250,
		},

		notes: {
			type: String,
			trim: true,
			maxlength: 1000,
		},

		status: {
			type: String,
			enum: STOCK_MOVEMENT_STATUS_VALUES,
			default: STOCK_MOVEMENT_STATUS.COMPLETED,
		},

		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

stockMovementSchema.index({
	business: 1,
	product: 1,
	createdAt: -1,
});

stockMovementSchema.index({
	business: 1,
	inventory: 1,
	createdAt: -1,
});

const StockMovement = mongoose.model("StockMovement", stockMovementSchema);

export default StockMovement;
