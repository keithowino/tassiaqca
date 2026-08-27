import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

import Permission from "../modules/identity/models/Permission.js";

dotenv.config({
	path: path.join(process.cwd(), ".env.development"),
});

const permissions = [
	/**
	 * Business
	 */
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
	{
		key: "BUSINESS_TRANSFER_OWNERSHIP",
		name: "Transfer Business Ownership",
	},
	{
		key: "AUDIT_LOG_VIEW",
		name: "View Audit Logs",
	},
	/**
	 * Added the one below while editing dashboard.routes.js
	 */
	{
		key: "BUSINESS_VIEW",
		name: "Business View Privileges",
	},

	/**
	 * Members
	 */
	{
		key: "MEMBER_INVITE",
		name: "Invite Member",
	},
	{
		key: "MEMBER_VIEW",
		name: "View Members",
	},
	{
		key: "MEMBER_ROLE_UPDATE",
		name: "Update Member Role",
	},
	{
		key: "MEMBER_REMOVE",
		name: "Remove Member",
	},

	/**
	 * Branches
	 */
	{
		key: "BRANCH_CREATE",
		name: "Create Branch",
	},
	{
		key: "BRANCH_VIEW",
		name: "View Branches",
	},
	{
		key: "BRANCH_UPDATE",
		name: "Update Branch",
	},
	{
		key: "BRANCH_DEACTIVATE",
		name: "Deactivate Branch",
	},
	{
		key: "BRANCH_REACTIVATE",
		name: "Reactivate Branch",
	},
	{
		key: "BRANCH_MEMBER_ASSIGN",
		name: "Branch Member Assignment",
	},
	{
		key: "BRANCH_MEMBER_VIEW",
		name: "View Branch Members",
	},
	{
		key: "BRANCH_MEMBER_REMOVE",
		name: "Remove Branch Member",
	},

	/**
	 * Offering
	 */
	{
		key: "OFFERING_CREATE",
		name: "Create Offering",
	},
	{
		key: "OFFERING_VIEW",
		name: "View Offering",
	},
	{
		key: "OFFERING_UPDATE",
		name: "Update Offering",
	},
	{
		key: "OFFERING_ARCHIVE",
		name: "Archive Offering",
	},
	{
		key: "OFFERING_RESTORE",
		name: "Restore Offering",
	},

	/**
	 * Products
	 */
	{
		key: "PRODUCT_CREATE",
		name: "Create Product",
	},
	{
		key: "PRODUCT_VIEW",
		name: "View Products",
	},
	{
		key: "PRODUCT_UPDATE",
		name: "Update Product",
	},
	{
		key: "PRODUCT_DELETE",
		name: "Delete Product",
	},

	/**
	 * Categories
	 */
	{
		key: "CATEGORY_VIEW",
		name: "View Categories",
	},
	{
		key: "CATEGORY_CREATE",
		name: "Create Categories",
	},
	{
		key: "CATEGORY_UPDATE",
		name: "Update Categories",
	},
	{
		key: "CATEGORY_DELETE",
		name: "Delete Categories",
	},

	/**
	 * Inventory
	 */
	{
		key: "INVENTORY_VIEW",
		name: "View Inventory",
	},
	{
		key: "INVENTORY_CREATE",
		name: "Create Inventory",
	},
	{
		key: "INVENTORY_UPDATE",
		name: "Update Inventory",
	},
	{
		key: "INVENTORY_DELETE",
		name: "Delete Inventory",
	},

	/**
	 * Stock Movement
	 */
	{
		key: "STOCK_MOVEMENT_CREATE",
		name: "Create Stock Movement Inventory",
	},
	{
		key: "STOCK_MOVEMENT_VIEW",
		name: "View Stock Movement Inventory",
	},
	{
		key: "STOCK_MOVEMENT_EXPORT",
		name: "Export Stock Movement Inventory",
	},

	/**
	 * Product Image
	 */
	{
		key: "PRODUCT_IMAGE_CREATE",
		name: "Create Product Image",
	},
	{
		key: "PRODUCT_IMAGE_VIEW",
		name: "View Product Image",
	},
	{
		key: "PRODUCT_IMAGE_UPDATE",
		name: "Update Product Image",
	},
	{
		key: "PRODUCT_IMAGE_DELETE",
		name: "Delete Product Image",
	},
	{
		key: "PRODUCT_IMAGE_SET_PRIMARY",
		name: "Set Primary Product Image",
	},

	/**
	 * Product Price
	 */
	{
		key: "PRODUCT_PRICE_CREATE",
		name: "Create Product Price",
	},
	{
		key: "PRODUCT_PRICE_VIEW",
		name: "View Product Price",
	},

	/**
	 * Services
	 */
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

	/**
	 * Reviews
	 */
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
