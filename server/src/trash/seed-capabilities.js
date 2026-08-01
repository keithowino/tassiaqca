import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import Capability from "../modules/business/models/Capability.js";

dotenv.config({ path: path.join(process.cwd(), ".env.development") });

const capabilities = [
	{
		key: "PRODUCTS",
		name: "Products",
	},

	{
		key: "SERVICES",
		name: "Services",
	},

	{
		key: "BOOKINGS",
		name: "Bookings",
	},

	{
		key: "INVENTORY",
		name: "Inventory",
	},

	{
		key: "STAFF",
		name: "Staff",
	},

	{
		key: "DELIVERY",
		name: "Delivery",
	},

	{
		key: "PAYMENTS",
		name: "Payments",
	},

	{
		key: "REVIEWS",
		name: "Reviews",
	},

	{
		key: "PORTFOLIO",
		name: "Portfolio",
	},

	{
		key: "QUOTES",
		name: "Quotes",
	},
];

async function seedCapabilities() {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("✅ Connected to MongoDB");

		// Clear existing capabilities
		await Capability.deleteMany();
		console.log("🧹 Cleared existing capabilities");

		// Insert new capabilities
		const result = await Capability.insertMany(capabilities);
		console.log(`✅ Inserted ${result.length} capabilities`);

		await mongoose.disconnect();
		console.log("\n✅ Seeding complete!");
	} catch (error) {
		console.error("❌ Error seeding capabilities:", error);
		process.exit(1);
	}
}

seedCapabilities();
