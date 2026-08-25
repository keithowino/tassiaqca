import mongoose from "mongoose";

const offeringInstructorSchema = new mongoose.Schema(
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

		businessMember: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "BusinessMember",
			required: true,
			index: true,
		},

		active: {
			type: Boolean,
			default: true,
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
		versionKey: false,
	},
);

offeringInstructorSchema.index(
	{
		business: 1,
		offering: 1,
		businessMember: 1,
	},
	{
		unique: true,
	},
);

export const OfferingInstructor =
	mongoose.models.OfferingInstructor ||
	mongoose.model("OfferingInstructor", offeringInstructorSchema);

export default OfferingInstructor;
