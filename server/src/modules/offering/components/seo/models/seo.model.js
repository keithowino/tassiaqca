import mongoose from "mongoose";

const seoSchema = new mongoose.Schema(
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
			unique: true,
			index: true,
		},

		title: {
			type: String,
			trim: true,
			default: "",
			maxlength: 200,
		},

		description: {
			type: String,
			trim: true,
			default: "",
			maxlength: 320,
		},

		keywords: {
			type: [String],
			default: [],
		},

		canonicalUrl: {
			type: String,
			trim: true,
			default: "",
		},

		ogImage: {
			type: String,
			trim: true,
			default: "",
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
		versionKey: false,
	},
);

seoSchema.index({
	business: 1,
	offering: 1,
});

export const OfferingSeo =
	mongoose.models.OfferingSeo || mongoose.model("OfferingSeo", seoSchema);

export default OfferingSeo;
