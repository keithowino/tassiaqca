import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import Capability from "../modules/business/models/Capability.js";
import BusinessType from "../modules/business/models/BusinessType.js";

dotenv.config({ path: path.join(process.cwd(), ".env.development") });

const capabilityMap = {};

const capabilities = await Capability.find();

capabilities.forEach((c) => {
	capabilityMap[c.key] = c._id;
});

const businessTypes = [
	{
		name: "Retail Shop",

		slug: "retail",

		capabilities: [
			capabilityMap.PRODUCTS,

			capabilityMap.INVENTORY,

			capabilityMap.PAYMENTS,

			capabilityMap.REVIEWS,
		],
	},

	{
		name: "Restaurant",

		slug: "restaurant",

		capabilities: [
			capabilityMap.PRODUCTS,

			capabilityMap.DELIVERY,

			capabilityMap.PAYMENTS,

			capabilityMap.REVIEWS,
		],
	},

	{
		name: "Salon",

		slug: "salon",

		capabilities: [
			capabilityMap.SERVICES,

			capabilityMap.BOOKINGS,

			capabilityMap.STAFF,

			capabilityMap.PAYMENTS,
		],
	},

	{
		name: "Professional Service",

		slug: "professional",

		capabilities: [
			capabilityMap.SERVICES,

			capabilityMap.QUOTES,

			capabilityMap.PORTFOLIO,

			capabilityMap.PAYMENTS,
		],
	},
];

async function seedBusinessTypes() {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("✅ Connected to MongoDB");

		// Clear existing business types
		await BusinessType.deleteMany();
		console.log("🧹 Cleared existing business types");

		// Insert new business types
		const result = await BusinessType.insertMany(businessTypes);
		console.log(`✅ Inserted ${result.length} business types`);

		await mongoose.disconnect();
		console.log("\n✅ Seeding complete!");
	} catch (error) {
		console.error("❌ Error seeding business types:", error);
		process.exit(1);
	}
}

seedBusinessTypes();
