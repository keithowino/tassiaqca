import sharedLifecycle from "./shared/offering.lifecycle.js";
import { productRepository } from "../../commerce/repositories/index.js";
import { HTTP_STATUS } from "../../../shared/constants/index.js";
import { AppError, ErrorCodes } from "../../../shared/errors/index.js";

/**
|--------------------------------------------------
| Private helper
|--------------------------------------------------
*/

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

	context.product = await getProjection(context).find(context.offering.id);

	return context.product;
}
// // commented temporarily
// const hooks = {
// 	...sharedLifecycle.hooks,

// 	async beforeCreate(context) {
// 		context.data.sku = normalizeSku(context.data.sku);

// 		await ensureSkuIsUnique(context.businessId, context.data.sku);
// 	},

// 	async afterCreate(context) {
// 		context.product = await getProjection(context).create(context);
// 	},

// 	async beforeUpdate(context) {
// 		await loadProjection(context);

// 		if (context.data.sku !== undefined) {
// 			context.data.sku = normalizeSku(context.data.sku);

// 			if (context.data.sku !== context.product?.sku) {
// 				await ensureSkuIsUnique(
// 					context.businessId,
// 					context.data.sku,
// 					context.product?.id,
// 				);
// 			}
// 		}
// 	},

// 	async afterUpdate(context) {
// 		await getProjection(context).update(context);
// 	},

// 	async beforeArchive(context) {
// 		await loadProjection(context);
// 	},

// 	async afterArchive(context) {
// 		await getProjection(context).archive(context);
// 	},

// 	async beforeRestore(context) {
// 		await loadProjection(context);
// 	},

// 	async afterRestore(context) {
// 		await getProjection(context).restore(context);
// 	},
// };

const hooks = {
	...sharedLifecycle.hooks,

	async beforeCreate(context) {
		await sharedLifecycle.hooks.beforeCreate(context);

		context.data.sku = normalizeSku(context.data.sku);

		await ensureSkuIsUnique(context.businessId, context.data.sku);
	},

	async afterCreate(context) {
		await sharedLifecycle.hooks.afterCreate(context);

		context.product = await getProjection(context).create(context);
	},

	// async afterCreate(context) {
	// 	console.log("[Product Hook] entered");

	// 	await sharedLifecycle.hooks.afterCreate(context);

	// 	console.log("[Product Hook] shared returned");

	// 	context.product = await getProjection(context).create(context);

	// 	console.log("[Product Hook] projection created");
	// },

	async beforeUpdate(context) {
		await sharedLifecycle.hooks.beforeUpdate(context);

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
		await sharedLifecycle.hooks.afterUpdate(context);

		await getProjection(context).update(context);
	},

	async beforeArchive(context) {
		await sharedLifecycle.hooks.beforeArchive(context);

		await loadProjection(context);
	},

	async afterArchive(context) {
		await sharedLifecycle.hooks.afterArchive(context);

		await getProjection(context).archive(context);
	},

	async beforeRestore(context) {
		await sharedLifecycle.hooks.beforeRestore(context);

		await loadProjection(context);
	},

	async afterRestore(context) {
		await sharedLifecycle.hooks.afterRestore(context);

		await getProjection(context).restore(context);
	},
};

export default {
	...sharedLifecycle,

	hooks,

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

	/**
	 * I am not sure whether i am to make list and get API's to have a similar implementation as create, update, archive and restore. I will leave it for now and come back to it later if needed.
	 */
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
