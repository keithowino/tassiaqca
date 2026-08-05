import mongoose from "mongoose";

/**
 * Subscription Projection
 *
 * Stores only Subscription-specific information.
 *
 * Shared information lives in the Offering aggregate.
 */
const subscriptionSchema = new mongoose.Schema(
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
		 * Subscription-specific fields.
		 *
		 * Future examples:
		 *
		 * - billingCycle
		 * - trialPeriod
		 * - renewalPolicy
		 * - cancellationPolicy
		 * - gracePeriod
		 * - billingProvider
		 * - pricingStrategy
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

export default mongoose.model("Subscription", subscriptionSchema);
