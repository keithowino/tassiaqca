import mongoose from "mongoose";

const branchSchema = new mongoose.Schema(
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
		},

		slug: {
			type: String,
			required: true,
			lowercase: true,
			trim: true,
		},

		description: {
			type: String,
			default: "",
			trim: true,
		},

		phone: {
			type: String,
			default: null,
			trim: true,
		},

		email: {
			type: String,
			default: null,
			lowercase: true,
			trim: true,
		},

		address: {
			type: String,
			required: true,
			trim: true,
		},

		city: {
			type: String,
			default: "",
			trim: true,
		},

		county: {
			type: String,
			default: "",
			trim: true,
		},

		latitude: {
			type: Number,
			default: null,
		},

		longitude: {
			type: Number,
			default: null,
		},

		active: {
			type: Boolean,
			default: true,
		},

		isHeadOffice: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);

/**
 *---
 * We enforce uniqueness on slug, not name.
 * This gives us future-friendly URLs like
 * /businesses/:businessId/branches/tassia-branch
 */
branchSchema.index(
	{
		business: 1,
		slug: 1,
	},
	{
		unique: true,
	},
);

branchSchema.index({
	business: 1,
	active: 1,
});

export default mongoose.model("Branch", branchSchema);
