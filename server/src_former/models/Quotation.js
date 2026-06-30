// Supporting Model (for Professional Services, Trades)
import mongoose from "mongoose";

const quotationSchema = new mongoose.Schema(
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
		quotationNumber: {
			type: String,
			unique: true,
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		items: [
			{
				description: String,
				quantity: Number,
				unitPrice: Number,
				total: Number,
				category: String,
			},
		],
		subtotal: {
			type: Number,
			required: true,
		},
		taxRate: {
			type: Number,
			default: 16,
		},
		taxAmount: {
			type: Number,
			default: 0,
		},
		discount: {
			type: Number,
			default: 0,
		},
		total: {
			type: Number,
			required: true,
		},
		validityDays: {
			type: Number,
			default: 14,
		},
		status: {
			type: String,
			enum: [
				"draft",
				"sent",
				"viewed",
				"accepted",
				"declined",
				"expired",
				"invoiced",
			],
			default: "draft",
		},
		notes: {
			type: String,
			default: "",
		},
		terms: {
			type: String,
			default: "",
		},
		paymentTerms: {
			type: String,
			enum: ["immediate", "net_7", "net_14", "net_30", "custom"],
			default: "net_14",
		},
		paymentStatus: {
			type: String,
			enum: ["pending", "partial", "paid"],
			default: "pending",
		},
		acceptedDate: {
			type: Date,
		},
		invoicedDate: {
			type: Date,
		},
	},
	{
		timestamps: true,
	},
);

quotationSchema.pre("save", function () {
	if (!this.quotationNumber) {
		const date = new Date();
		const year = date.getFullYear().toString().slice(-2);
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		const random = Math.floor(Math.random() * 10000)
			.toString()
			.padStart(4, "0");
		this.quotationNumber = `Q-${year}${month}${day}-${random}`;
	}
});

export default mongoose.model("Quotation", quotationSchema);
