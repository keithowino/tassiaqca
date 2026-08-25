import mongoose from "mongoose";

const offeringMembershipSchema = new mongoose.Schema(
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

		durationMinutes: {
			type: Number,
			min: 1,
			default: null,
		},

		renewable: {
			type: Boolean,
			default: false,
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

offeringMembershipSchema.index(
	{
		business: 1,
		offering: 1,
	},
	{
		unique: true,
	},
);

export const OfferingMembership =
	mongoose.models.OfferingMembership ||
	mongoose.model("OfferingMembership", offeringMembershipSchema);

export default OfferingMembership;
