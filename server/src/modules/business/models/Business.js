import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},

		slug: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},

		description: String,

		businessType: {
			type: String,
			required: true,
			uppercase: true,
			trim: true,
		},

		phone: String,

		email: String,

		logo: String,

		coverImage: String,

		verified: {
			type: Boolean,
			default: false,
		},

		active: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("Business", businessSchema);
