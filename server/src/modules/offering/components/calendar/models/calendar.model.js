import mongoose from "mongoose";

import {
	OFFERING_CALENDAR_TYPE,
	OFFERING_CALENDAR_TYPE_VALUES,
} from "../../../../../shared/index.js";

const calendarSchema = new mongoose.Schema(
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

		name: {
			type: String,
			required: true,
			trim: true,
			maxlength: 150,
		},

		timezone: {
			type: String,
			required: true,
			trim: true,
			default: "Africa/Nairobi",
			maxlength: 100,
		},

		type: {
			type: String,
			required: true,
			enum: OFFERING_CALENDAR_TYPE_VALUES,
			default: OFFERING_CALENDAR_TYPE.INTERNAL,
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
			default: null,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

calendarSchema.index(
	{
		business: 1,
		offering: 1,
	},
	{
		unique: true,
	},
);

export const OfferingCalendar =
	mongoose.models.OfferingCalendar ||
	mongoose.model("OfferingCalendar", calendarSchema);

export default OfferingCalendar;
