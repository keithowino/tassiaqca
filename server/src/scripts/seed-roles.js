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
					permissionMap.BUSINESS_TRANSFER_OWNERSHIP,
					permissionMap.BUSINESS_VIEW,
					permissionMap.AUDIT_LOG_VIEW,

					permissionMap.MEMBER_INVITE,
					permissionMap.MEMBER_VIEW,
					permissionMap.MEMBER_ROLE_UPDATE,
					permissionMap.MEMBER_REMOVE,

					permissionMap.BRANCH_CREATE,
					permissionMap.BRANCH_VIEW,
					permissionMap.BRANCH_UPDATE,
					permissionMap.BRANCH_DEACTIVATE,
					permissionMap.BRANCH_REACTIVATE,
					permissionMap.BRANCH_MEMBER_ASSIGN,
					permissionMap.BRANCH_MEMBER_VIEW,
					permissionMap.BRANCH_MEMBER_REMOVE,

					permissionMap.OFFERING_CREATE,
					permissionMap.OFFERING_VIEW,
					permissionMap.OFFERING_UPDATE,
					permissionMap.OFFERING_ARCHIVE,
					permissionMap.OFFERING_RESTORE,

					permissionMap.PRODUCT_VIEW,
					permissionMap.PRODUCT_CREATE,
					permissionMap.PRODUCT_UPDATE,
					permissionMap.PRODUCT_DELETE,

					permissionMap.PRODUCT_IMAGE_CREATE,
					permissionMap.PRODUCT_IMAGE_VIEW,
					permissionMap.PRODUCT_IMAGE_UPDATE,
					permissionMap.PRODUCT_IMAGE_DELETE,
					permissionMap.PRODUCT_IMAGE_SET_PRIMARY,

					permissionMap.CATEGORY_VIEW,
					permissionMap.CATEGORY_CREATE,
					permissionMap.CATEGORY_UPDATE,
					permissionMap.CATEGORY_DELETE,

					permissionMap.INVENTORY_VIEW,
					permissionMap.INVENTORY_CREATE,
					permissionMap.INVENTORY_UPDATE,
					permissionMap.INVENTORY_DELETE,

					permissionMap.STOCK_MOVEMENT_CREATE,
					permissionMap.STOCK_MOVEMENT_VIEW,
					permissionMap.STOCK_MOVEMENT_EXPORT,

					permissionMap.PRODUCT_PRICE_CREATE,
					permissionMap.PRODUCT_PRICE_VIEW,

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
					permissionMap.BUSINESS_VIEW,
					permissionMap.BRANCH_VIEW,

					permissionMap.OFFERING_CREATE,
					permissionMap.OFFERING_VIEW,
					permissionMap.OFFERING_UPDATE,
					permissionMap.OFFERING_ARCHIVE,
					permissionMap.OFFERING_RESTORE,

					permissionMap.PRODUCT_VIEW,
					permissionMap.PRODUCT_CREATE,
					permissionMap.PRODUCT_UPDATE,

					permissionMap.PRODUCT_IMAGE_CREATE,
					permissionMap.PRODUCT_IMAGE_VIEW,
					permissionMap.PRODUCT_IMAGE_UPDATE,
					permissionMap.PRODUCT_IMAGE_SET_PRIMARY,

					permissionMap.CATEGORY_VIEW,
					permissionMap.CATEGORY_CREATE,
					permissionMap.CATEGORY_UPDATE,

					permissionMap.INVENTORY_VIEW,
					permissionMap.INVENTORY_CREATE,
					permissionMap.INVENTORY_UPDATE,

					permissionMap.STOCK_MOVEMENT_CREATE,
					permissionMap.STOCK_MOVEMENT_VIEW,
					permissionMap.STOCK_MOVEMENT_EXPORT,

					permissionMap.PRODUCT_PRICE_CREATE,
					permissionMap.PRODUCT_PRICE_VIEW,

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
					permissionMap.BUSINESS_VIEW,
					permissionMap.BRANCH_VIEW,

					permissionMap.OFFERING_VIEW,

					permissionMap.PRODUCT_VIEW,
					permissionMap.PRODUCT_CREATE,

					permissionMap.PRODUCT_IMAGE_VIEW,

					permissionMap.CATEGORY_VIEW,
					permissionMap.CATEGORY_CREATE,

					permissionMap.INVENTORY_VIEW,

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
