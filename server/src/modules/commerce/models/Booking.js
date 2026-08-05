import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
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
		 * Booking-specific fields
		 */

		duration: {
			type: Number,
			default: 0,
		},

		bufferBefore: {
			type: Number,
			default: 0,
		},

		bufferAfter: {
			type: Number,
			default: 0,
		},

		maxParticipants: {
			type: Number,
			default: 1,
		},

		locationType: {
			type: String,
			default: "ONSITE",
		},

		location: {
			type: String,
			default: "",
		},

		requiresApproval: {
			type: Boolean,
			default: false,
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

export default mongoose.model("Booking", bookingSchema);
