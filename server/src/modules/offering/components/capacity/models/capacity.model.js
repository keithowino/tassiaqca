import mongoose from "mongoose";

const capacitySchema = new mongoose.Schema(
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

		limit: {
			type: Number,
			required: true,
			min: 1,
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

capacitySchema.index(
	{
		business: 1,
		offering: 1,
	},
	{
		unique: true,
	},
);

export const OfferingCapacity =
	mongoose.models.OfferingCapacity ||
	mongoose.model("OfferingCapacity", capacitySchema);

export default OfferingCapacity;
