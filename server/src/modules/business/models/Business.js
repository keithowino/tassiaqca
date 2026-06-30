import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},

		description: String,

		businessType: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "BusinessType",
			required: true,
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
