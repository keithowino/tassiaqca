import mongoose from "mongoose";

/**
 * Event Projection
 *
 * Stores only Event-specific information.
 *
 * Shared information lives in the Offering aggregate.
 */
const eventSchema = new mongoose.Schema(
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
		 * Event-specific fields.
		 *
		 * Future examples:
		 *
		 * - startDate
		 * - endDate
		 * - timezone
		 * - venue
		 * - capacity
		 * - registrationRequired
		 * - onlineMeetingUrl
		 * - recurringSchedule
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

export default mongoose.model("Event", eventSchema);
