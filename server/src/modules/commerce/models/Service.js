import mongoose from "mongoose";

/**
 * Service Projection
 *
 * Stores only Service-specific information.
 *
 * Shared information such as:
 * - name
 * - slug
 * - description
 * - status
 * - visibility
 * - searchable
 * - metadata
 *
 * lives in the Offering aggregate.
 */
const serviceSchema = new mongoose.Schema(
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
		 * Future Service-specific fields
		 *
		 * Examples:
		 *
		 * - duration
		 * - preparationTime
		 * - cleanupTime
		 * - pricingStrategy
		 * - assignedEmployees
		 * - serviceLocation
		 * - requiresApproval
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

export default mongoose.model("Service", serviceSchema);
