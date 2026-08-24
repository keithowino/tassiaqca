import mongoose from "mongoose";

import {
	OFFERING_SCHEDULING_MODE,
	OFFERING_SCHEDULING_MODE_VALUES,
} from "../../../../../shared/index.js";

const offeringSchedulingSchema = new mongoose.Schema(
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

		mode: {
			type: String,
			required: true,
			enum: OFFERING_SCHEDULING_MODE_VALUES,
			default: OFFERING_SCHEDULING_MODE.FIXED,
		},

		timezone: {
			type: String,
			required: true,
			trim: true,
			default: "Africa/Nairobi",
			maxlength: 100,
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

offeringSchedulingSchema.index(
	{
		business: 1,
		offering: 1,
	},
	{
		unique: true,
	},
);

export const OfferingScheduling =
	mongoose.models.OfferingScheduling ||
	mongoose.model("OfferingScheduling", offeringSchedulingSchema);

export default OfferingScheduling;
