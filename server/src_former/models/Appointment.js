// Supporting Model (for Services, Health, Beauty)
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
	{
		businessId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Business",
			required: true,
		},
		clientId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		staffId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Staff",
			required: false,
		},
		offeringId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Offering",
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		startTime: {
			type: String,
			required: true,
		},
		endTime: {
			type: String,
			required: true,
		},
		duration: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			enum: [
				"pending",
				"confirmed",
				"in_progress",
				"completed",
				"cancelled",
				"no_show",
			],
			default: "pending",
		},
		notes: {
			type: String,
			default: "",
		},
		clientNotes: {
			type: String,
			default: "",
		},
		reminderSent: {
			type: Boolean,
			default: false,
		},
		reminderTime: {
			type: Date,
		},
		price: {
			type: Number,
			required: true,
		},
		paymentStatus: {
			type: String,
			enum: ["pending", "paid", "failed", "refunded"],
			default: "pending",
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("Appointment", appointmentSchema);
