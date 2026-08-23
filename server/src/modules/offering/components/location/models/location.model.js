import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
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

		name: {
			type: String,
			trim: true,
			default: "",
		},

		address: {
			type: String,
			trim: true,
			default: "",
		},

		city: {
			type: String,
			trim: true,
			default: "",
		},

		county: {
			type: String,
			trim: true,
			default: "",
		},

		country: {
			type: String,
			trim: true,
			default: "Kenya",
		},

		latitude: {
			type: Number,
			default: null,
			min: -90,
			max: 90,
		},

		longitude: {
			type: Number,
			default: null,
			min: -180,
			max: 180,
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

locationSchema.index(
	{
		business: 1,
		offering: 1,
	},
	{
		unique: true,
	},
);

export const OfferingLocation =
	mongoose.models.OfferingLocation ||
	mongoose.model("OfferingLocation", locationSchema);

export default OfferingLocation;
