import mongoose from "mongoose";

/**
 * db.products.getIndexes()
 *
 * db.products.dropIndex("business_1_name_1")
 */

/**
 * Product Projection
 *
 * Stores only Product-specific information.
 *
 * Shared information such as:
 * - name
 * - slug
 * - description
 * - status
 * - visibility
 * - searchable
 * - metadata
 *
 * lives in the Offering aggregate.
 */
const productSchema = new mongoose.Schema(
	{
		business: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Business",
			required: true,
			index: true,
		},

		offering: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Offering",
			required: true,
			unique: true,
			index: true,
		},

		/**
		 * Product-specific identity
		 */
		sku: {
			type: String,
			trim: true,
		},

		/**
		 * Product classification
		 */
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "ProductCategory",
			default: null,
		},

		/**
		 * Future Product-only fields
		 *
		 * Examples:
		 *
		 * physical:
		 *  - weight
		 *  - dimensions
		 *  - barcode
		 *  - manufacturer
		 *  - brand
		 *
		 * shipping:
		 *  - requiresShipping
		 *  - shippingClass
		 *
		 * inventory:
		 *  - inventoryStrategy
		 *  - stockBehaviour
		 *
		 * compliance:
		 *  - serialised
		 *  - warranty
		 */

		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		updatedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

/**
 * SKU must remain unique within a business.
 */
productSchema.index(
	{ business: 1, sku: 1 },
	{
		unique: true,
		sparse: true,
	},
);

export default mongoose.model("Product", productSchema);
