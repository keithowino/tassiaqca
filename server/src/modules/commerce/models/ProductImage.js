import mongoose from "mongoose";

import {
	PRODUCT_IMAGE_STATUS,
	PRODUCT_IMAGE_STATUS_VALUES,
	STORAGE_PROVIDER_VALUES,
	STORAGE_PROVIDERS,
} from "../../../shared/constants/index.js";

/**
 * This model is intentionally metadata-only. The actual binary image will eventually live in Cloudinary, S3, etc., while this collection stores everything the application needs to manage those images.
 */
const productImageSchema = new mongoose.Schema(
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

		url: {
			type: String,
			required: true,
			trim: true,
		},

		storageProvider: {
			type: String,
			enum: STORAGE_PROVIDER_VALUES,
			required: true,
			default: STORAGE_PROVIDERS.CLOUDINARY,
		},

		storageKey: {
			type: String,
			required: true,
			trim: true,
		},

		width: {
			type: Number,
			default: null,
		},

		height: {
			type: Number,
			default: null,
		},

		format: {
			type: String,
			default: null,
			trim: true,
		},

		bytes: {
			type: Number,
			default: null,
		},

		altText: {
			type: String,
			trim: true,
			default: null,
		},

		caption: {
			type: String,
			trim: true,
			default: null,
		},

		sortOrder: {
			type: Number,
			default: 0,
			min: 0,
		},

		isPrimary: {
			type: Boolean,
			default: false,
		},

		status: {
			type: String,
			enum: PRODUCT_IMAGE_STATUS_VALUES,
			default: PRODUCT_IMAGE_STATUS.ACTIVE,
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

productImageSchema.index({
	product: 1,
	sortOrder: 1,
});

productImageSchema.index({
	product: 1,
	isPrimary: 1,
});

export default mongoose.model("ProductImage", productImageSchema);
