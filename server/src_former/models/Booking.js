// Supporting Model (for Trades, Services)
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
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
		serviceId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Offering",
			required: true,
		},
		scheduledDate: {
			type: Date,
			required: true,
		},
		scheduledTime: {
			type: String,
			required: true,
		},
		estimatedDuration: {
			type: Number,
			default: 60,
		},
		status: {
			type: String,
			enum: [
				"pending",
				"confirmed",
				"in_progress",
				"completed",
				"cancelled",
			],
			default: "pending",
		},
		serviceAddress: {
			type: String,
			default: "",
		},
		serviceNotes: {
			type: String,
			default: "",
		},
		clientNotes: {
			type: String,
			default: "",
		},
		materialsList: [
			{
				name: String,
				quantity: Number,
				price: Number,
				isRequired: { type: Boolean, default: true },
			},
		],
		estimatedPrice: {
			type: Number,
		},
		finalPrice: {
			type: Number,
		},
		paymentStatus: {
			type: String,
			enum: ["pending", "paid", "failed", "refunded"],
			default: "pending",
		},
		isEmergency: {
			type: Boolean,
			default: false,
		},
		emergencyFee: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("Booking", bookingSchema);
