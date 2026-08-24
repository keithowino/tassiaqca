import mongoose from "mongoose";

const offeringRegistrationSchema = new mongoose.Schema(
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

		approvalRequired: {
			type: Boolean,
			default: false,
		},

		maximumRegistrations: {
			type: Number,
			min: 1,
			default: null,
		},

		registrationDeadlineMinutes: {
			type: Number,
			min: 0,
			default: null,
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

offeringRegistrationSchema.index(
	{
		business: 1,
		offering: 1,
	},
	{
		unique: true,
	},
);

export const OfferingRegistration =
	mongoose.models.OfferingRegistration ||
	mongoose.model("OfferingRegistration", offeringRegistrationSchema);

export default OfferingRegistration;
