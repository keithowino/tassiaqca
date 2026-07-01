import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

import Permission from "../modules/identity/models/Permission.js";

dotenv.config({
	path: path.join(process.cwd(), ".env.development"),
});

const permissions = [
	// Business
	{
		key: "BUSINESS_CREATE",
		name: "Create Business",
	},
	{
		key: "BUSINESS_UPDATE",
		name: "Update Business",
	},
	{
		key: "BUSINESS_DELETE",
		name: "Delete Business",
	},

	// Members
	{
		key: "MEMBER_INVITE",
		name: "Invite Member",
	},
	{
		key: "MEMBER_REMOVE",
		name: "Remove Member",
	},

	// Products
	{
		key: "PRODUCT_CREATE",
		name: "Create Product",
	},
	{
		key: "PRODUCT_UPDATE",
		name: "Update Product",
	},
	{
		key: "PRODUCT_DELETE",
		name: "Delete Product",
	},

	// Services
	{
		key: "SERVICE_CREATE",
		name: "Create Service",
	},
	{
		key: "SERVICE_UPDATE",
		name: "Update Service",
	},
	{
		key: "SERVICE_DELETE",
		name: "Delete Service",
	},

	// Reviews
	{
		key: "REVIEW_REPLY",
		name: "Reply to Reviews",
	},
];

async function seedPermissions() {
	try {
		await mongoose.connect(process.env.MONGODB_URI);

		console.log("Connected.");

		await Permission.deleteMany();

		await Permission.insertMany(permissions);

		console.log(`Seeded ${permissions.length} permissions.`);

		await mongoose.disconnect();

		console.log("Done.");
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

seedPermissions();
