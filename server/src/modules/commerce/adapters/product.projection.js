/**
 * Do not remove the commented block till further notice.
 */
// import productRepository from "../repositories/product.repository.js";
// import { projectionContract } from "../../offering/projections/index.js";

// /*
// |--------------------------------------------------------------------------
// | Helpers
// |--------------------------------------------------------------------------
// */

// function mapOfferingToProduct(offering, actor) {
// 	return {
// 		business: offering.business,

// 		offering: offering.id,

// 		slug: offering.slug,

// 		name: offering.name,

// 		shortDescription: offering.shortDescription,

// 		description: offering.description,

// 		status: offering.status,

// 		createdBy: actor.id,

// 		updatedBy: actor.id,
// 	};
// }

// /*
// |--------------------------------------------------------------------------
// | Adapter
// |--------------------------------------------------------------------------
// */

// async function createFromOffering(context) {
// 	const { offering, actor, data } = context;

// 	const payload = {
// 		...mapOfferingToProduct(offering, actor),
// 		category: data.categoryId ?? null,
// 	};

// 	if (data.sku) {
// 		payload.sku = data.sku;
// 	}

// 	return productRepository.create(payload);
// }

// async function findByOffering(offeringId) {
// 	return productRepository.findByOffering(offeringId);
// }

// async function updateFromOffering(context) {
// 	const { product, offering, actor, data } = context;

// 	if (!product) {
// 		return null;
// 	}

// 	product.slug = offering.slug;
// 	product.name = offering.name;
// 	product.shortDescription = offering.shortDescription;
// 	product.description = offering.description;
// 	product.status = offering.status;

// 	if (data.sku !== undefined) {
// 		product.sku = data.sku;
// 	}

// 	if (data.categoryId !== undefined) {
// 		product.category = data.categoryId;
// 	}

// 	product.updatedBy = actor.id;

// 	return productRepository.save(product);
// }

// async function archiveFromOffering(context) {
// 	const { product, offering, actor } = context;

// 	if (!product) {
// 		return null;
// 	}

// 	product.status = offering.status;
// 	product.updatedBy = actor.id;

// 	return productRepository.save(product);
// }

// async function restoreFromOffering(context) {
// 	const { product, offering, actor } = context;

// 	if (!product) {
// 		return null;
// 	}

// 	product.status = offering.status;
// 	product.updatedBy = actor.id;

// 	return productRepository.save(product);
// }

// export default {
// 	...projectionContract,

// 	find: findByOffering,

// 	create: createFromOffering,

// 	update: updateFromOffering,

// 	archive: archiveFromOffering,

// 	restore: restoreFromOffering,
// };

// // ...

import { productRepository } from "../repositories/index.js";
import { projectionContract } from "../../offering/projections/index.js";

/**
 * This also makes future extensions (variants, dimensions, shipping, inventory policies, manufacturer, barcode, etc.) straightforward without duplicating any Offering state.
 */

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function mapOfferingToProduct(offering, actor) {
	return {
		business: offering.business,

		offering: offering.id,

		createdBy: actor.id,

		updatedBy: actor.id,
	};
}

/*
|--------------------------------------------------------------------------
| Projection
|--------------------------------------------------------------------------
*/

async function create(context) {
	const { offering, actor, data } = context;

	return productRepository.create({
		...mapOfferingToProduct(offering, actor),

		sku: data.sku ?? null,

		category: data.categoryId ?? null,
	});
}

async function find(offeringId) {
	return productRepository.findByOffering(offeringId);
}

async function update(context) {
	const { product, actor, data } = context;

	if (!product) {
		return null;
	}

	if (data.sku !== undefined) {
		product.sku = data.sku;
	}

	if (data.categoryId !== undefined) {
		product.category = data.categoryId;
	}

	product.updatedBy = actor.id;

	return productRepository.save(product);
}

/**
 * Nothing Product-specific currently changes when an Offering
 * is archived. The projection exists only to satisfy the lifecycle
 * contract and to provide future extension points.
 */
async function archive() {
	return null;
}

/**
 * Nothing Product-specific currently changes when an Offering
 * is restored.
 */
async function restore() {
	return null;
}

export default {
	...projectionContract,

	find,

	create,

	update,

	archive,

	restore,
};
