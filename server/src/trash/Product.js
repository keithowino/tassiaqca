import mongoose from "mongoose";

const productDetailsSchema = new mongoose.Schema({
	offering: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Offering",
		unique: true,
	},

	sku: String,

	barcode: String,

	price: Number,

	stock: Number,

	lowStockThreshold: Number,

	brand: String,

	weight: Number,
});

export default mongoose.model("ProductDetails", productDetailsSchema);
