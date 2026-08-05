import mongoose from "mongoose";

/**
 * Membership Projection
 *
 * Stores only Membership-specific information.
 *
 * Shared information lives in the Offering aggregate.
 */
const membershipSchema = new mongoose.Schema(
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

		/**
		 * Membership-specific fields.
		 *
		 * Future examples:
		 *
		 * - membershipLevel
		 * - billingInterval
		 * - duration
		 * - renewalPolicy
		 * - gracePeriod
		 * - benefits
		 * - accessRules
		 */

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

export default mongoose.model("Membership", membershipSchema);
