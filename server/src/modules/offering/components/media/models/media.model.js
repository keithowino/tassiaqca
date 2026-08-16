import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
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

		/**
		 * References an asset owned by the Files platform service.
		 */
		assetId: {
			type: String,
			required: true,
			trim: true,
			index: true,
		},

		type: {
			type: String,
			enum: ["IMAGE", "VIDEO", "DOCUMENT", "AUDIO"],
			required: true,
		},

		/**
		 * Current asset URL/reference supplied by the media/file layer.
		 */
		url: {
			type: String,
			required: true,
			trim: true,
		},

		alt: {
			type: String,
			trim: true,
			default: "",
		},

		title: {
			type: String,
			trim: true,
			default: "",
		},

		position: {
			type: Number,
			required: true,
			min: 0,
			index: true,
		},

		featured: {
			type: Boolean,
			default: false,
		},

		metadata: {
			type: Map,
			of: mongoose.Schema.Types.Mixed,
			default: {},
		},

		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		updatedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			default: null,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

mediaSchema.index({
	offering: 1,
	position: 1,
});

mediaSchema.index(
	{
		offering: 1,
		assetId: 1,
	},
	{
		unique: true,
	},
);

export const OfferingMedia =
	mongoose.models.OfferingMedia ||
	mongoose.model("OfferingMedia", mediaSchema);

export default OfferingMedia;
