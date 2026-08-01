/**
 * Product aggregate.
 *
 * Used by repositories whose primary aggregate is Product.
 */
export const PRODUCT_POPULATE = [
	{
		path: "createdBy",
	},
	{
		path: "updatedBy",
	},
];

/**
 * Product Variant aggregate.
 */
export const PRODUCT_VARIANT_POPULATE = [
	{
		path: "product",
	},
	{
		path: "createdBy",
	},
	{
		path: "updatedBy",
	},
];

/**
 * Inventory aggregate.
 */
export const INVENTORY_POPULATE = [
	{
		path: "product",
	},
	{
		path: "createdBy",
	},
	{
		path: "updatedBy",
	},
];

/**
 * Product Price aggregate.
 */
export const PRODUCT_PRICE_POPULATE = [
	{
		path: "product",
	},
	{
		path: "createdBy",
	},
	{
		path: "updatedBy",
	},
];

/**
 * Product Image aggregate.
 */
export const PRODUCT_IMAGE_POPULATE = [
	{
		path: "product",
	},
	{
		path: "createdBy",
	},
	{
		path: "updatedBy",
	},
];

/**
 * Stock Movement aggregate.
 */
export const STOCK_MOVEMENT_POPULATE = [
	{
		path: "inventory",
	},
	{
		path: "product",
	},
	{
		path: "createdBy",
	},
];
