import mongoose from "mongoose";

const tagsSchema = new mongoose.Schema(
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

		tag: {
			type: String,
			required: true,
			trim: true,
			maxlength: 100,
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

tagsSchema.index(
	{
		offering: 1,
		tag: 1,
	},
	{
		unique: true,
	},
);

tagsSchema.index({
	business: 1,
	offering: 1,
});

export const OfferingTag =
	mongoose.models.OfferingTag || mongoose.model("OfferingTag", tagsSchema);

export default OfferingTag;
