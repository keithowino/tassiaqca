You mentioned at 6. The final step (next file), that the only remaining change will be in the code that dispatches to the lifecycle (likely your offering.service.js or wherever you do registration.lifecycle.create(...)). I am not sure where we are supposed to do that. Check the following files to confirm where we are supposed to.

```js
`~\server\src\modules\offering\services\offering.service.js`;

import lifecycleFactory from "../lifecycles/lifecycle.factory.js";
import { offeringRepository } from "../repositories/index.js";

/**
 * Delegation layer
 */

/**
|--------------------------------------------------
| Private helper functions
|--------------------------------------------------
*/

function lifecycleFor(payload) {
	return lifecycleFactory.resolveLifecycle(payload.data.type);
}

async function resolveExistingLifecycle({ businessId, offeringId }) {
	const offering = await offeringRepository.findByBusinessAndId(
		businessId,
		offeringId,
	);

	if (!offering) {
		return lifecycleFactory.resolveLifecycle("UNKNOWN");
	}

	return lifecycleFactory.resolveLifecycle(offering.type);
}

/**
|--------------------------------------------------
| Public functions
|--------------------------------------------------
*/

/**
 * The fallback to "PRODUCT" is only a transitional mechanism. For get, update, archive, and restore, the service does not yet know the offering type because it only receives an offeringId. In the next refinement, the resolver should determine the lifecycle by first loading the offering from the repository:
 */

async function createOffering(payload) {
	return lifecycleFor(payload).create(payload);
}

async function listOfferings(payload) {
	// shared for now
	return lifecycleFactory
		.resolveLifecycle(payload.query?.type ?? "PRODUCT")
		.list(payload);
}

async function getOffering(payload) {
	const lifecycle = await resolveExistingLifecycle(payload);

	return lifecycle.get(payload);
}

async function updateOffering(payload) {
	const lifecycle = await resolveExistingLifecycle(payload);

	return lifecycle.update(payload);
}

async function archiveOffering(payload) {
	const lifecycle = await resolveExistingLifecycle(payload);

	return lifecycle.archive(payload);
}

async function restoreOffering(payload) {
	const lifecycle = await resolveExistingLifecycle(payload);

	return lifecycle.restore(payload);
}

export default {
	createOffering,
	listOfferings,
	getOffering,
	updateOffering,
	archiveOffering,
	restoreOffering,
};
```

```js
`~\server\src\modules\offering\controllers\offering.controller.js`;

import { success } from "../../../shared/utils/apiResponse.js";
import asyncHandler from "../../../shared/utils/asyncHandler.js";
import { validateRequest } from "../../../shared/validation/index.js";

import { offeringService } from "../services/index.js";

import {
	businessParamsSchema,
	createOfferingRequestSchema,
	listOfferingsQuerySchema,
	offeringParamsSchema,
	updateOfferingRequestSchema,
} from "../validators/index.js";

const createOffering = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessParamsSchema,
			body: createOfferingRequestSchema,
		},
		req,
	);

	const offering = await offeringService.createOffering({
		businessId: params.businessId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, offering, "Offering created successfully.");
});

const listOfferings = asyncHandler(async (req, res) => {
	const { params, query } = validateRequest(
		{
			params: businessParamsSchema,
			query: listOfferingsQuerySchema,
		},
		req,
	);

	const offerings = await offeringService.listOfferings({
		businessId: params.businessId,
		query,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, offerings);
});

const getOffering = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: offeringParamsSchema,
		},
		req,
	);

	const offering = await offeringService.getOffering({
		businessId: params.businessId,
		offeringId: params.offeringId,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, offering);
});

const updateOffering = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: offeringParamsSchema,
			body: updateOfferingRequestSchema,
		},
		req,
	);

	const offering = await offeringService.updateOffering({
		businessId: params.businessId,
		offeringId: params.offeringId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, offering, "Offering updated successfully.");
});

const archiveOffering = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: offeringParamsSchema,
		},
		req,
	);

	const offering = await offeringService.archiveOffering({
		businessId: params.businessId,
		offeringId: params.offeringId,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, offering, "Offering archived successfully.");
});

const restoreOffering = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: offeringParamsSchema,
		},
		req,
	);

	const offering = await offeringService.restoreOffering({
		businessId: params.businessId,
		offeringId: params.offeringId,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, offering, "Offering restored successfully.");
});

export default {
	createOffering,
	listOfferings,
	getOffering,
	updateOffering,
	archiveOffering,
	restoreOffering,
};
```

```js
`~\server\src\modules\offering\builders\offering.factory.js`;

import offeringRegistry from "../../../shared/platform/offerings/offering.registry.js";

/**
 * Its sole responsibility is to resolve the correct builder for an offering type and delegate construction.
 */

function resolveBuilder(type) {
	const definition = offeringRegistry.get(type);

	if (!definition) {
		throw new Error(`Unknown offering type "${type}".`);
	}

	return definition.builder;
}

function createOffering(payload) {
	return resolveBuilder(payload.data.type)(payload);
}

export default {
	createOffering,
};
```

```js
`~\server\src\modules\offering\builders\offering.builder.js`;

import offeringRegistry from "../../../shared/platform/offerings/offering.registry.js";

export function buildOffering({ businessId, data, slug, actor }) {
	const definition = offeringRegistry.get(data.type);

	if (!definition) {
		throw new Error(`Unknown offering type "${data.type}".`);
	}

	const defaults = definition.defaults;

	return {
		business: businessId,

		type: definition.type,

		slug,

		name: data.name.trim(),

		shortDescription: data.shortDescription ?? "",

		description: data.description ?? "",

		status: data.status ?? defaults.status,

		visibility: data.visibility ?? defaults.visibility,

		searchable: data.searchable ?? defaults.searchable,

		featured: data.featured ?? defaults.featured,

		metadata: {
			...defaults.metadata,
			...(data.metadata ?? {}),
		},

		createdBy: actor.id,

		updatedBy: actor.id,
	};
}
```

```js
`~\server\src\modules\commerce\adapters\product.projection.js`;

import productRepository from "../repositories/product.repository.js";
import { projectionContract } from "../../offering/projections/index.js";

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function mapOfferingToProduct(offering, actor) {
	return {
		business: offering.business,

		offering: offering.id,

		slug: offering.slug,

		name: offering.name,

		shortDescription: offering.shortDescription,

		description: offering.description,

		status: offering.status,

		createdBy: actor.id,

		updatedBy: actor.id,
	};
}

/*
|--------------------------------------------------------------------------
| Adapter
|--------------------------------------------------------------------------
*/

async function createFromOffering(context) {
	const { offering, actor, data } = context;

	const payload = {
		...mapOfferingToProduct(offering, actor),
		category: data.categoryId ?? null,
	};

	if (data.sku) {
		payload.sku = data.sku;
	}

	return productRepository.create(payload);
}

async function findByOffering(offeringId) {
	return productRepository.findByOffering(offeringId);
}

async function updateFromOffering(context) {
	const { product, offering, actor, data } = context;

	if (!product) {
		return null;
	}

	product.slug = offering.slug;
	product.name = offering.name;
	product.shortDescription = offering.shortDescription;
	product.description = offering.description;
	product.status = offering.status;

	if (data.sku !== undefined) {
		product.sku = data.sku;
	}

	if (data.categoryId !== undefined) {
		product.category = data.categoryId;
	}

	product.updatedBy = actor.id;

	return productRepository.save(product);
}

async function archiveFromOffering(context) {
	const { product, offering, actor } = context;

	if (!product) {
		return null;
	}

	product.status = offering.status;
	product.updatedBy = actor.id;

	return productRepository.save(product);
}

async function restoreFromOffering(context) {
	const { product, offering, actor } = context;

	if (!product) {
		return null;
	}

	product.status = offering.status;
	product.updatedBy = actor.id;

	return productRepository.save(product);
}

export default {
	...projectionContract,

	find: findByOffering,

	create: createFromOffering,

	update: updateFromOffering,

	archive: archiveFromOffering,

	restore: restoreFromOffering,
};
```

```js
`~\server\src\modules\offering\lifecycles\product.lifecycle.js`;

import sharedLifecycle from "./shared/offering.lifecycle.js";
import productRepository from "../../commerce/repositories/product.repository.js";
// import productAdapter from "../../commerce/adapters/product.adapter.js";
import { HTTP_STATUS } from "../../../shared/constants/index.js";
import { AppError, ErrorCodes } from "../../../shared/errors/index.js";
// import { offeringRegistry } from "../../../shared/platform/offerings/index.js";
// import { OFFERING_TYPES } from "../../../shared/platform/offerings/index.js";

/**
|--------------------------------------------------
| Private helper
|--------------------------------------------------
*/

// const projection = offeringRegistry.get(OFFERING_TYPES.PRODUCT).projection;
function getProjection(context) {
	return context.registration.projection;
}

function normalizeSku(sku) {
	return sku?.trim().toUpperCase() ?? null;
}

async function ensureSkuIsUnique(businessId, sku, excludeId = null) {
	if (!sku) return;

	const existing = await productRepository.findByBusinessAndSku(
		businessId,
		sku,
		excludeId,
	);

	if (existing) {
		throw new AppError(
			"A product with this SKU already exists.",
			HTTP_STATUS.CONFLICT,
			ErrorCodes.CONFLICT,
		);
	}
}

async function loadProjection(context) {
	if (context.product) {
		return context.product;
	}

	// context.product = await productAdapter.findByOffering(context.offering.id);
	// context.product = await projection.find(context.offering.id);
	context.product = await getProjection(context).find(context.offering.id);

	return context.product;
}

const hooks = {
	...sharedLifecycle.hooks,

	async beforeCreate(context) {
		context.data.sku = normalizeSku(context.data.sku);

		await ensureSkuIsUnique(context.businessId, context.data.sku);
	},

	async afterCreate(context) {
		// context.product = await productAdapter.createFromOffering(context);
		// context.product = await projection.create(context);
		context.product = await getProjection(context).create(context);
	},

	async beforeUpdate(context) {
		await loadProjection(context);

		if (context.data.sku !== undefined) {
			context.data.sku = normalizeSku(context.data.sku);

			if (context.data.sku !== context.product?.sku) {
				await ensureSkuIsUnique(
					context.businessId,
					context.data.sku,
					context.product?.id,
				);
			}
		}
	},

	async afterUpdate(context) {
		// await productAdapter.updateFromOffering(context);
		// await projection.update(context);
		await getProjection(context).update(context);
	},

	async beforeArchive(context) {
		await loadProjection(context);
	},

	async afterArchive(context) {
		// await productAdapter.archiveFromOffering(context);
		// await projection.archive(context);
		await getProjection(context).archive(context);
	},

	async beforeRestore(context) {
		await loadProjection(context);
	},

	async afterRestore(context) {
		// await productAdapter.restoreFromOffering(context);
		// await projection.restore(context);
		await getProjection(context).restore(context);
	},
};

export default {
	...sharedLifecycle,

	hooks,

	// create(payload) {
	// 	return sharedLifecycle.create({
	// 		...payload,
	// 		hooks,
	// 	});
	// },

	create(payload) {
		return sharedLifecycle.create({
			...payload,
			registration: {
				lifecycle: { hooks },
				...payload.registration,
			},
		});
	},

	update(payload) {
		return sharedLifecycle.update({
			...payload,
			registration: {
				lifecycle: { hooks },
				...payload.registration,
			},
		});
	},

	// I am not sure whether i am to make list and get API's to have a similar implementation as create, update, archive and restore. I will leave it for now and come back to it later if needed.
	list: sharedLifecycle.list,
	get: sharedLifecycle.get,

	archive(payload) {
		return sharedLifecycle.archive({
			...payload,
			registration: {
				lifecycle: { hooks },
				...payload.registration,
			},
		});
	},

	restore(payload) {
		return sharedLifecycle.restore({
			...payload,
			registration: {
				lifecycle: { hooks },
				...payload.registration,
			},
		});
	},
};
```
