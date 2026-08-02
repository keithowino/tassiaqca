import sharedLifecycle from "./shared/offering.lifecycle.js";
import productRepository from "../../commerce/repositories/product.repository.js";
import productAdapter from "../../commerce/adapters/product.adapter.js";
import { HTTP_STATUS } from "../../../shared/constants/index.js";
import { AppError, ErrorCodes } from "../../../shared/errors/index.js";

/**
|--------------------------------------------------
| Private helper
|--------------------------------------------------
*/

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

async function loadProduct(context) {
	if (context.product) {
		return context.product;
	}

	context.product = await productAdapter.findByOffering(context.offering.id);

	return context.product;
}

const hooks = {
	...sharedLifecycle.hooks,

	async beforeCreate(context) {
		context.data.sku = normalizeSku(context.data.sku);

		await ensureSkuIsUnique(context.businessId, context.data.sku);
	},

	async afterCreate(context) {
		context.product = await productAdapter.createFromOffering(context);
	},

	async beforeUpdate(context) {
		await loadProduct(context);

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
		await productAdapter.updateFromOffering(context);
	},

	async beforeArchive(context) {
		await loadProduct(context);
	},

	async afterArchive(context) {
		await productAdapter.archiveFromOffering(context);
	},

	async beforeRestore(context) {
		await loadProduct(context);
	},

	async afterRestore(context) {
		await productAdapter.restoreFromOffering(context);
	},
};

export default {
	...sharedLifecycle,

	hooks,

	create(payload) {
		return sharedLifecycle.create({
			...payload,
			hooks,
		});
	},

	update(payload) {
		return sharedLifecycle.update({
			...payload,
			hooks,
		});
	},

	list: sharedLifecycle.list,
	get: sharedLifecycle.get,

	archive(payload) {
		return sharedLifecycle.archive({
			...payload,
			hooks,
		});
	},

	restore(payload) {
		return sharedLifecycle.restore({
			...payload,
			hooks,
		});
	},
};
