/**
 * Converts a single Product document into a JSON-friendly object by:
 * - Converting MongoDB ObjectIds to strings.
 * - Hiding internal Mongoose properties (__v, document methods, etc.).
 * - Returning a consistent response shape.
 * - Returning null when no product is provided.
 */
const present = (product) => {
	if (!product) {
		return null;
	}

	return {
		id: product._id.toString(),

		businessId: product.business?.toString(),

		name: product.name,
		slug: product.slug,

		shortDescription: product.shortDescription,
		description: product.description,

		sku: product.sku,

		categoryId: product.category?.toString() ?? null,

		status: product.status,

		createdBy: product.createdBy?.toString(),
		updatedBy: product.updatedBy?.toString(),

		createdAt: product.createdAt,
		updatedAt: product.updatedAt,
	};
};

const presentCollection = (result) => {
	return {
		data: result.products.map(present),

		pagination: {
			total: result.total,
			page: result.page,
			limit: result.limit,
			totalPages: result.totalPages,
		},
	};
};

export default {
	present,
	presentCollection,
};
