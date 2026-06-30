import mongoose from "mongoose";

const offeringSchema = new mongoose.Schema(
	{
		business: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Business",
			required: true,
			index: true,
		},

		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "OfferingCategory",
		},

		type: {
			type: String,
			enum: [
				"PRODUCT",
				"SERVICE",
				"MEAL",
				"BOOKING",
				"RENTAL",
				"PACKAGE",
				"DIGITAL",
				"SUBSCRIPTION",
			],
			required: true,
			index: true,
		},

		name: {
			type: String,
			required: true,
			trim: true,
		},

		description: String,

		shortDescription: String,

		images: [
			{
				url: String,
				publicId: String,
			},
		],

		active: {
			type: Boolean,
			default: true,
		},

		featured: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("Offering", offeringSchema);
