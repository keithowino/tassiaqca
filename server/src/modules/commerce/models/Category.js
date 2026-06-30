import mongoose from "mongoose";

const offeringCategorySchema = new mongoose.Schema(
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

		description: String,
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("OfferingCategory", offeringCategorySchema);
