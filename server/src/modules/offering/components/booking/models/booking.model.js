import mongoose from "mongoose";

const offeringBookingSchema = new mongoose.Schema(
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

		active: {
			type: Boolean,
			default: true,
			index: true,
		},

		confirmationRequired: {
			type: Boolean,
			default: false,
		},

		minimumAdvanceMinutes: {
			type: Number,
			min: 0,
			default: 0,
		},

		maximumAdvanceMinutes: {
			type: Number,
			min: 0,
			default: null,
		},

		cancellationWindowMinutes: {
			type: Number,
			min: 0,
			default: 0,
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

offeringBookingSchema.index(
	{
		business: 1,
		offering: 1,
	},
	{
		unique: true,
	},
);

export const OfferingBooking =
	mongoose.models.OfferingBooking ||
	mongoose.model("OfferingBooking", offeringBookingSchema);

export default OfferingBooking;
