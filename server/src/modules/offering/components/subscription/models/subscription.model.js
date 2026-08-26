import mongoose from "mongoose";

import {
	OFFERING_SUBSCRIPTION_BILLING_INTERVAL_UNITS,
	OFFERING_SUBSCRIPTION_BILLING_INTERVAL_UNIT_VALUES,
} from "../../../../../shared/index.js";

const offeringSubscriptionSchema = new mongoose.Schema(
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

		billingIntervalUnit: {
			type: String,
			enum: OFFERING_SUBSCRIPTION_BILLING_INTERVAL_UNIT_VALUES,
			required: true,
			default: OFFERING_SUBSCRIPTION_BILLING_INTERVAL_UNITS.MONTH,
		},

		billingIntervalCount: {
			type: Number,
			min: 1,
			required: true,
			default: 1,
		},

		renewable: {
			type: Boolean,
			default: true,
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

offeringSubscriptionSchema.index(
	{
		business: 1,
		offering: 1,
	},
	{
		unique: true,
	},
);

export const OfferingSubscription =
	mongoose.models.OfferingSubscription ||
	mongoose.model("OfferingSubscription", offeringSubscriptionSchema);

export default OfferingSubscription;
