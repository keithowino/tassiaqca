import mongoose from "mongoose";

import {
	CATEGORY_STATUS,
	CATEGORY_STATUS_VALUES,
} from "../../../shared/constants/index.js";

const productCategorySchema = new mongoose.Schema(
	{
		business: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Business",
			required: true,
			index: true,
		},

		name: {
			type: String,
			required: true,
			trim: true,
			maxlength: 150,
		},

		slug: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
		},

		description: {
			type: String,
			trim: true,
			default: null,
		},

		parentCategory: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "ProductCategory",
			default: null,
		},

		status: {
			type: String,
			enum: CATEGORY_STATUS_VALUES,
			default: CATEGORY_STATUS.ACTIVE,
			index: true,
		},

		sortOrder: {
			type: Number,
			default: 0,
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

productCategorySchema.index({
	business: 1,
	name: 1,
});

productCategorySchema.index({
	business: 1,
	slug: 1,
});

productCategorySchema.index({
	business: 1,
	parentCategory: 1,
});

productCategorySchema.index({
	business: 1,
	status: 1,
});

export default mongoose.model("ProductCategory", productCategorySchema);
