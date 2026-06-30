// Supporting Model (for Beauty, Health, etc.)
import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
	{
		businessId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Business",
			required: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		role: {
			type: String,
			enum: [
				"owner",
				"manager",
				"staff",
				"technician",
				"doctor",
				"instructor",
			],
			default: "staff",
		},
		title: {
			type: String,
			trim: true,
		},
		specialization: [String],
		bio: {
			type: String,
			default: "",
		},
		profileImage: {
			type: String,
			default: null,
		},
		hourlyRate: {
			type: Number,
			default: 0,
		},
		commissionRate: {
			type: Number,
			default: 0,
		},
		availability: [
			{
				day: {
					type: String,
					enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
				},
				start: String,
				end: String,
				isAvailable: { type: Boolean, default: true },
			},
		],
		isActive: {
			type: Boolean,
			default: true,
		},
		sortOrder: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("Staff", staffSchema);
