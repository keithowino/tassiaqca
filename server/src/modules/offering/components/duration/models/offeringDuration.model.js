import mongoose from "mongoose";

import {
	OFFERING_DURATION_UNIT_VALUES,
	OFFERING_DURATION_STATUS,
	OFFERING_DURATION_STATUS_VALUES,
} from "../../../../../shared/index.js";

const offeringDurationSchema = new mongoose.Schema(
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

		duration: {
			type: Number,
			required: true,
			min: 1,
		},

		unit: {
			type: String,
			required: true,
			enum: OFFERING_DURATION_UNIT_VALUES,
		},

		status: {
			type: String,
			enum: OFFERING_DURATION_STATUS_VALUES,
			default: OFFERING_DURATION_STATUS.ACTIVE,
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
	},
);

offeringDurationSchema.index(
	{
		business: 1,
		offering: 1,
	},
	{
		unique: true,
	},
);

export const OfferingDuration =
	mongoose.models.OfferingDuration ||
	mongoose.model("OfferingDuration", offeringDurationSchema);

export default OfferingDuration;
