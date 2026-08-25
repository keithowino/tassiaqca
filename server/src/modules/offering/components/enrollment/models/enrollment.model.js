import mongoose from "mongoose";

const offeringEnrollmentSchema = new mongoose.Schema(
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

		maximumEnrollments: {
			type: Number,
			min: 1,
			default: null,
		},

		enrollmentDeadlineMinutes: {
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

offeringEnrollmentSchema.index(
	{
		business: 1,
		offering: 1,
	},
	{
		unique: true,
	},
);

export const OfferingEnrollment =
	mongoose.models.OfferingEnrollment ||
	mongoose.model("OfferingEnrollment", offeringEnrollmentSchema);

export default OfferingEnrollment;
