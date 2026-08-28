/**
 * Do not remove the commented block till further notice.
 */
// import productRepository from "../repositories/product.repository.js";
// import productPresenter from "../presenters/product.presenter.js";
// import businessRepository from "../../business/repositories/business.repository.js";
// import { auditLogService } from "../../audit/index.js";
// import slugify from "../../../shared/utils/slugify.js";
// import {
// 	PRODUCT_STATUS,
// 	AUDIT_ACTIONS,
// 	AUDIT_ENTITY_TYPES,
// 	HTTP_STATUS,
// } from "../../../shared/constants/index.js";
// import { AppError, ErrorCodes } from "../../../shared/errors/index.js";

// /*
// |--------------------------------------------------------------------------
// | Private Helpers
// |--------------------------------------------------------------------------
// */

// async function ensureBusinessExists(businessId) {
// 	const business = await businessRepository.findById(businessId);

// 	if (!business) {
// 		throw new AppError(
// 			"Business not found.",
// 			HTTP_STATUS.NOT_FOUND,
// 			ErrorCodes.NOT_FOUND,
// 		);
// 	}

// 	return business;
// }

// async function ensureProductExists(businessId, productId) {
// 	const product = await productRepository.findByBusinessAndId(
// 		businessId,
// 		productId,
// 	);

// 	if (!product) {
// 		throw new AppError(
// 			"Product not found.",
// 			HTTP_STATUS.NOT_FOUND,
// 			ErrorCodes.NOT_FOUND,
// 		);
// 	}

// 	return product;
// }

// async function ensureProductNameIsUnique(businessId, name, excludeId = null) {
// 	const existing = await productRepository.findByBusinessAndName(
// 		businessId,
// 		name,
// 		excludeId,
// 	);

// 	if (existing) {
// 		throw new AppError(
// 			"A product with this name already exists.",
// 			HTTP_STATUS.CONFLICT,
// 			ErrorCodes.CONFLICT,
// 		);
// 	}
// }

// // function normalizeSku(sku) {
// // 	return sku?.trim().toUpperCase() ?? null;
// // }

// // async function ensureSkuIsUnique(businessId, sku, excludeId = null) {
// // 	if (!sku) {
// // 		return;
// // 	}

// // 	const existing = await productRepository.findByBusinessAndSku(
// // 		businessId,
// // 		sku,
// // 		excludeId,
// // 	);

// // 	if (existing) {
// // 		throw new AppError(
// // 			"A product with this SKU already exists.",
// // 			HTTP_STATUS.CONFLICT,
// // 			ErrorCodes.CONFLICT,
// // 		);
// // 	}
// // }

// /**
//  * No duplicate-key exceptions.
//  */
// async function generateUniqueSlug(businessId, name, excludeId = null) {
// 	const baseSlug = slugify(name);

// 	let slug = baseSlug;

// 	let counter = 2;

// 	while (
// 		await productRepository.existsByBusinessAndSlug(
// 			businessId,
// 			slug,
// 			excludeId,
// 		)
// 	) {
// 		slug = `${baseSlug}-${counter++}`;
// 	}

// 	return slug;
// }

// function buildAuditMetadata(product) {
// 	return {
// 		name: product.name,
// 		sku: product.sku,
// 		slug: product.slug,
// 		status: product.status,
// 	};
// }

// /*
// |--------------------------------------------------------------------------
// | Public Service
// |--------------------------------------------------------------------------
// */

// async function create({ businessId, data, actor, requestMetadata }) {
// 	await ensureBusinessExists(businessId);

// 	const name = data.name.trim();

// 	await ensureProductNameIsUnique(businessId, name);

// 	const sku = normalizeSku(data.sku);

// 	await ensureSkuIsUnique(businessId, sku);

// 	const slug = await generateUniqueSlug(businessId, name);

// 	const product = await productRepository.create({
// 		...data,
// 		business: businessId,
// 		name,
// 		sku,
// 		slug,
// 		createdBy: actor.id,
// 		updatedBy: actor.id,
// 	});

// 	await auditLogService.log({
// 		business: businessId,
// 		entityType: AUDIT_ENTITY_TYPES.PRODUCT,
// 		entityId: product.id,
// 		action: AUDIT_ACTIONS.PRODUCT_CREATED,
// 		actor,

// 		requestMetadata,

// 		metadata: buildAuditMetadata(product),
// 	});

// 	return productPresenter.present(product);
// }

// async function update({ businessId, productId, data, actor, requestMetadata }) {
// 	await ensureBusinessExists(businessId);

// 	const product = await ensureProductExists(businessId, productId);

// 	if (product.status === PRODUCT_STATUS.ARCHIVED) {
// 		throw new AppError(
// 			"Archived products cannot be updated.",
// 			HTTP_STATUS.BAD_REQUEST,
// 			ErrorCodes.BAD_REQUEST,
// 		);
// 	}

// 	if (data.name !== undefined) {
// 		const name = data.name.trim();

// 		if (name !== product.name) {
// 			await ensureProductNameIsUnique(businessId, name, product.id);

// 			product.slug = await generateUniqueSlug(
// 				businessId,
// 				name,
// 				product.id,
// 			);

// 			product.name = name;
// 		}
// 	}

// 	if (data.sku !== undefined) {
// 		const sku = normalizeSku(data.sku);

// 		if (sku !== product.sku) {
// 			await ensureSkuIsUnique(businessId, sku, product.id);

// 			product.sku = sku;
// 		}
// 	}

// 	if (data.shortDescription !== undefined) {
// 		product.shortDescription = data.shortDescription;
// 	}

// 	if (data.description !== undefined) {
// 		product.description = data.description;
// 	}

// 	if (data.categoryId !== undefined) {
// 		product.category = data.categoryId;
// 	}

// 	if (data.status !== undefined) {
// 		product.status = data.status;
// 	}

// 	product.updatedBy = actor.id;

// 	await productRepository.save(product);

// 	await auditLogService.log({
// 		business: businessId,
// 		entityType: AUDIT_ENTITY_TYPES.PRODUCT,
// 		entityId: product.id,
// 		action: AUDIT_ACTIONS.PRODUCT_UPDATED,
// 		actor,

// 		requestMetadata,

// 		metadata: buildAuditMetadata(product),
// 	});

// 	return productPresenter.present(product);
// }

// async function list({ businessId, query }) {
// 	await ensureBusinessExists(businessId);

// 	const result = await productRepository.findByBusiness(businessId, query);

// 	return productPresenter.presentCollection(result);
// }

// async function getById({ businessId, productId }) {
// 	await ensureBusinessExists(businessId);

// 	const product = await ensureProductExists(businessId, productId);

// 	return productPresenter.present(product);
// }

// async function archive({ businessId, productId, actor, requestMetadata }) {
// 	await ensureBusinessExists(businessId);

// 	const product = await ensureProductExists(businessId, productId);

// 	if (product.status === PRODUCT_STATUS.ARCHIVED) {
// 		throw new AppError(
// 			"Product is already archived.",
// 			HTTP_STATUS.BAD_REQUEST,
// 			ErrorCodes.BAD_REQUEST,
// 		);
// 	}

// 	product.status = PRODUCT_STATUS.ARCHIVED;

// 	product.updatedBy = actor.id;

// 	await productRepository.save(product);

// 	await auditLogService.log({
// 		business: businessId,
// 		entityType: AUDIT_ENTITY_TYPES.PRODUCT,
// 		entityId: product.id,
// 		action: AUDIT_ACTIONS.PRODUCT_ARCHIVED,
// 		actor,

// 		requestMetadata,

// 		metadata: buildAuditMetadata(product),
// 	});

// 	return productPresenter.present(product);
// }

// async function restore({ businessId, productId, actor, requestMetadata }) {
// 	await ensureBusinessExists(businessId);

// 	const product = await ensureProductExists(businessId, productId);

// 	if (product.status !== PRODUCT_STATUS.ARCHIVED) {
// 		throw new AppError(
// 			"Product is not archived.",
// 			HTTP_STATUS.BAD_REQUEST,
// 			ErrorCodes.BAD_REQUEST,
// 		);
// 	}

// 	product.status = PRODUCT_STATUS.ACTIVE;

// 	product.updatedBy = actor.id;

// 	await productRepository.save(product);

// 	await auditLogService.log({
// 		business: businessId,
// 		entityType: AUDIT_ENTITY_TYPES.PRODUCT,
// 		entityId: product.id,
// 		action: AUDIT_ACTIONS.PRODUCT_RESTORED,
// 		actor,

// 		requestMetadata,

// 		metadata: buildAuditMetadata(product),
// 	});

// 	return productPresenter.present(product);
// }

// export default {
// 	create,
// 	update,
// 	list,
// 	getById,
// 	archive,
// 	restore,
// };

// // ...

import { productRepository } from "../repositories/index.js";
import productPresenter from "../presenters/product.presenter.js";

import businessRepository from "../../business/repositories/business.repository.js";

import {
	HTTP_STATUS,
	AppError,
	ErrorCodes,
	ensureBusinessExists,
} from "../../../shared/index.js";

/*
|--------------------------------------------------------------------------
| Private Helpers
|--------------------------------------------------------------------------
*/

async function ensureProductExists(businessId, productId) {
	const product = await productRepository.findByBusinessAndId(
		businessId,
		productId,
	);

	if (!product) {
		throw new AppError(
			"Product not found.",
			HTTP_STATUS.NOT_FOUND,
			ErrorCodes.NOT_FOUND,
		);
	}

	return product;
}

/*
|--------------------------------------------------------------------------
| Read Services
|--------------------------------------------------------------------------
*/

async function list({ businessId, query }) {
	await ensureBusinessExists(businessId);

	const result = await productRepository.findByBusiness(businessId, query);

	return productPresenter.presentCollection(result);
}

async function getById({ businessId, productId }) {
	await ensureBusinessExists(businessId);

	const product = await ensureProductExists(businessId, productId);

	return productPresenter.present(product);
}

export default {
	list,
	getById,
};
