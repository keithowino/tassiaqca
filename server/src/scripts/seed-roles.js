import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

import Role from "../modules/identity/models/Role.js";
import Permission from "../modules/identity/models/Permission.js";

dotenv.config({
	path: path.join(process.cwd(), ".env.development"),
});

async function seedRoles() {
	try {
		await mongoose.connect(process.env.MONGODB_URI);

		console.log("Connected.");

		const permissionMap = {};

		const permissions = await Permission.find();

		permissions.forEach((permission) => {
			permissionMap[permission.key] = permission._id;
		});

		const roles = [
			{
				name: "Owner",
				slug: "owner",
				description: "Business owner",
				system: true,
				permissions: Object.values(permissionMap),
			},

			{
				name: "Administrator",
				slug: "administrator",
				description: "Business administrator",
				system: true,
				permissions: [
					permissionMap.BUSINESS_UPDATE,
					permissionMap.MEMBER_INVITE,
					permissionMap.MEMBER_REMOVE,
					permissionMap.PRODUCT_CREATE,
					permissionMap.PRODUCT_UPDATE,
					permissionMap.PRODUCT_DELETE,
					permissionMap.SERVICE_CREATE,
					permissionMap.SERVICE_UPDATE,
					permissionMap.SERVICE_DELETE,
					permissionMap.REVIEW_REPLY,
				],
			},

			{
				name: "Manager",
				slug: "manager",
				description: "Business manager",
				system: true,
				permissions: [
					permissionMap.PRODUCT_CREATE,
					permissionMap.PRODUCT_UPDATE,
					permissionMap.SERVICE_CREATE,
					permissionMap.SERVICE_UPDATE,
					permissionMap.REVIEW_REPLY,
				],
			},

			{
				name: "Staff",
				slug: "staff",
				description: "Business staff",
				system: true,
				permissions: [
					permissionMap.PRODUCT_CREATE,
					permissionMap.SERVICE_CREATE,
				],
			},
		];

		await Role.deleteMany();

		await Role.insertMany(roles);

		console.log(`Seeded ${roles.length} roles.`);

		await mongoose.disconnect();

		console.log("Done.");
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

seedRoles();
