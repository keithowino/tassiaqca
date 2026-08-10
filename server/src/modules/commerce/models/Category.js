import mongoose from "mongoose";

import {
	CATEGORY_STATUS,
	CATEGORY_STATUS_VALUES,
} from "../../../shared/constants/index.js";

const categorySchema = new mongoose.Schema(
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
			maxlength: 200,
		},

		slug: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			index: true,
		},

		description: {
			type: String,
			default: "",
			trim: true,
			maxlength: 1000,
		},

		parent: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			default: null,
			index: true,
		},

		status: {
			type: String,
			enum: CATEGORY_STATUS_VALUES,
			default: CATEGORY_STATUS.ACTIVE,
			index: true,
		},

		position: {
			type: Number,
			default: 0,
			min: 0,
		},

		metadata: {
			type: mongoose.Schema.Types.Mixed,
			default: {},
		},

		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},

		updatedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		timestamps: true,
	},
);

categorySchema.index({
	business: 1,
	slug: 1,
});

categorySchema.index({
	business: 1,
	parent: 1,
	position: 1,
});

export const Category =
	mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
