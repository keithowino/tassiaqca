import mongoose from "mongoose";

/**
 * Package Projection
 *
 * Stores only Package-specific information.
 *
 * Shared Offering information lives in the Offering aggregate.
 */
const packageSchema = new mongoose.Schema(
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
		 * Future Package-specific fields
		 *
		 * Examples:
		 * - bundledOfferings
		 * - bundleStrategy
		 * - packageRules
		 * - minimumSelections
		 * - maximumSelections
		 * - pricingStrategy
		 * - validityPeriod
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

export default mongoose.model("Package", packageSchema);
