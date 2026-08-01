import mongoose from "mongoose";

const businessTypeSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},

		slug: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},

		description: {
			type: String,
			default: "",
		},

		capabilities: [
			{
				type: String,
				enum: [
					"PRODUCTS",
					"SERVICES",
					"BOOKINGS",
					"INVENTORY",
					"DELIVERY",
					"STAFF",
					"QUOTES",
					"PAYMENTS",
					"REVIEWS",
					"PORTFOLIO",
				],
			},
		],

		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("BusinessType", businessTypeSchema);
