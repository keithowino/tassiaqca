import mongoose from "mongoose";

/**
 * Rental Projection
 *
 * Stores only Rental-specific information.
 *
 * Shared information lives in the Offering aggregate.
 */
const rentalSchema = new mongoose.Schema(
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
		 * Rental-specific fields.
		 *
		 * Future examples:
		 *
		 * - assetCode
		 * - rentalUnit
		 * - minimumDuration
		 * - maximumDuration
		 * - depositRequired
		 * - availabilityStrategy
		 * - maintenanceSchedule
		 * - replacementValue
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

export default mongoose.model("Rental", rentalSchema);
