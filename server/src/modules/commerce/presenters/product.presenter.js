/**
 * Do not remove the commented block till further notice.
 */
// /**
//  * Converts a single Product document into a JSON-friendly object by:
//  * - Converting MongoDB ObjectIds to strings.
//  * - Hiding internal Mongoose properties (__v, document methods, etc.).
//  * - Returning a consistent response shape.
//  * - Returning null when no product is provided.
//  */
// const present = (product) => {
// 	if (!product) {
// 		return null;
// 	}

// 	return {
// 		id: product._id.toString(),

// 		businessId: product.business?.toString(),

// 		name: product.name,
// 		slug: product.slug,

// 		shortDescription: product.shortDescription,
// 		description: product.description,

// 		sku: product.sku,

// 		categoryId: product.category?.toString() ?? null,

// 		status: product.status,

// 		createdBy: product.createdBy?.toString(),
// 		updatedBy: product.updatedBy?.toString(),

// 		createdAt: product.createdAt,
// 		updatedAt: product.updatedAt,
// 	};
// };

// const presentCollection = (result) => {
// 	return {
// 		data: result.products.map(present),

// 		pagination: {
// 			total: result.total,
// 			page: result.page,
// 			limit: result.limit,
// 			totalPages: result.totalPages,
// 		},
// 	};
// };

// export default {
// 	present,
// 	presentCollection,
// };

// // ...

import { getId } from "../../../shared/index.js";

/**
 * Converts a single Product document into a JSON-friendly object by:
 * - Converting MongoDB ObjectIds to strings.
 * - Hiding internal Mongoose properties (__v, document methods, etc.).
 * - Returning a consistent response shape.
 * - Returning null when no product is provided.
 *
 * Combines the Product projection with its Offering aggregate into a single
 * API response.
 */
class ProductPresenter {
	present(product) {
		if (!product) return null;

		const offering = product.offering;

		return {
			id: getId(product),

			businessId: getId(product.business),

			offeringId: getId(offering),

			/**
			 * Offering fields
			 */
			type: offering?.type,

			name: offering?.name,

			slug: offering?.slug,

			shortDescription: offering?.shortDescription,

			description: offering?.description,

			status: offering?.status,

			visibility: offering?.visibility,

			searchable: offering?.searchable,

			featured: offering?.featured,

			metadata: offering?.metadata ?? {},

			/**
			 * Product fields
			 */
			sku: product.sku,

			categoryId: getId(product.category),

			createdBy: getId(product.createdBy),

			updatedBy: getId(product.updatedBy),

			createdAt: product.createdAt,

			updatedAt: product.updatedAt,
		};
	}

	presentCollection(result) {
		return {
			data: result.products.map((product) => this.present(product)),

			pagination: {
				total: result.total,
				page: result.page,
				limit: result.limit,
				totalPages: result.totalPages,
			},
		};
	}
}

export default new ProductPresenter();
