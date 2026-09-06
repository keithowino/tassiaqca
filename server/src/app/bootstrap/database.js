import mongoose from "mongoose";
import env from "../config/env.js";

// db.products.dropIndex("business_1_name_1");
// db.products.getIndexes();

export async function connectDatabase() {
	await mongoose.connect(env.mongoUri);

	console.log("✅ Connected to MongoDB");
}
