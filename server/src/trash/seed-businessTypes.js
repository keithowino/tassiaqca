import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

import BusinessType from "../modules/business/models/BusinessType.js";

dotenv.config({
	path: path.join(process.cwd(), ".env.development"),
});

const businessTypes = [
	{
		name: "Retail Shop",
		slug: "retail",
		description: "Businesses that primarily sell products.",
		capabilities: ["PRODUCTS", "INVENTORY", "PAYMENTS", "REVIEWS"],
	},

	{
		name: "Restaurant",
		slug: "restaurant",
		description: "Food and beverage businesses.",
		capabilities: ["PRODUCTS", "DELIVERY", "PAYMENTS", "REVIEWS"],
	},

	{
		name: "Salon",
		slug: "salon",
		description: "Beauty and wellness businesses.",
		capabilities: ["SERVICES", "BOOKINGS", "STAFF", "PAYMENTS"],
	},

	{
		name: "Professional Service",
		slug: "professional",
		description: "Professional service providers.",
		capabilities: ["SERVICES", "QUOTES", "PORTFOLIO", "PAYMENTS"],
	},
];

async function seedBusinessTypes() {
	try {
		await mongoose.connect(process.env.MONGODB_URI);

		console.log("✅ Connected");

		await BusinessType.deleteMany();

		console.log("🧹 Cleared existing business types");

		await BusinessType.insertMany(businessTypes);

		console.log(`✅ Inserted ${businessTypes.length} business types`);

		await mongoose.disconnect();

		console.log("✅ Done");
	} catch (error) {
		console.error(error);

		process.exit(1);
	}
}

seedBusinessTypes();
