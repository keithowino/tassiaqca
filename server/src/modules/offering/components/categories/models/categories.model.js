import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema(
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

		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			required: true,
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

categoriesSchema.index(
	{
		offering: 1,
		category: 1,
	},
	{
		unique: true,
	},
);

categoriesSchema.index({
	business: 1,
	offering: 1,
});

export default mongoose.model("OfferingCategory", categoriesSchema);
