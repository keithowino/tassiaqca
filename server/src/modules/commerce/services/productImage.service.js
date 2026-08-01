import productImageRepository from "../repositories/productImage.repository.js";
import productRepository from "../repositories/product.repository.js";

import productImagePresenter from "../presenters/productImage.presenter.js";

import businessRepository from "../../business/repositories/business.repository.js";

import { auditLogService } from "../../audit/index.js";

import { getId } from "../../../shared/utils/presenter.js";

import {
	AUDIT_ACTIONS,
	AUDIT_ENTITY_TYPES,
	HTTP_STATUS,
} from "../../../shared/constants/index.js";

import { AppError, ErrorCodes } from "../../../shared/errors/index.js";
import imageStorageService from "../../../shared/services/imageStorage/imageStorage.service.js";

/*
|--------------------------------------------------------------------------
| Private Helpers
|--------------------------------------------------------------------------
*/

async function ensureBusinessExists(businessId) {
	const business = await businessRepository.findById(businessId);

	if (!business) {
		throw new AppError(
			"Business not found.",
			HTTP_STATUS.NOT_FOUND,
			ErrorCodes.NOT_FOUND,
		);
	}

	return business;
}

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

async function ensureImageExists(businessId, imageId) {
	const image = await productImageRepository.findByBusinessAndId(
		businessId,
		imageId,
	);

	if (!image) {
		throw new AppError(
			"Product image not found.",
			HTTP_STATUS.NOT_FOUND,
			ErrorCodes.NOT_FOUND,
		);
	}

	return image;
}

/**
 * Reserved for future business rules.
 *
 * Examples:
 * - Prevent deleting the last product image.
 * - Prevent deleting the only primary image.
 * - Automatically promote another image to primary.
 */
async function ensurePrimaryImageCanBeRemoved(image) {
	return image;
}

async function makePrimaryImage(image, actorId) {
	await productImageRepository.clearPrimaryImage(getId(image.product));

	image.isPrimary = true;
	image.updatedBy = actorId;

	await productImageRepository.save(image);

	return image;
}

async function populateImage(businessId, imageId) {
	const image = await productImageRepository.findByBusinessAndId(
		businessId,
		imageId,
	);

	return productImagePresenter.present(image);
}

/*
|--------------------------------------------------------------------------
| Public Service
|--------------------------------------------------------------------------
*/

async function create({ businessId, data, actor, requestMetadata }) {
	await ensureBusinessExists(businessId);

	await ensureProductExists(businessId, data.productId);

	const uploadedImage = await imageStorageService.uploadProductImage({
		file: data.file,
		productId: data.productId,
	});

	/*
	|--------------------------------------------------------------------------
	| Primary Image
	|--------------------------------------------------------------------------
	|
	| Only one image may be primary.
	|
	*/

	const existingPrimary = await productImageRepository.findPrimaryByProduct(
		data.productId,
	);

	const shouldBecomePrimary = data.isPrimary || !existingPrimary;

	if (shouldBecomePrimary) {
		await productImageRepository.clearPrimaryImage(data.productId);
	}

	const image = await productImageRepository.create({
		business: businessId,

		product: data.productId,

		url: uploadedImage.url,

		storageKey: uploadedImage.storageKey,

		storageProvider: uploadedImage.storageProvider,

		width: uploadedImage.width,

		height: uploadedImage.height,

		format: uploadedImage.format,

		bytes: uploadedImage.bytes,

		altText: data.altText,

		isPrimary: shouldBecomePrimary,

		sortOrder: data.sortOrder,

		createdBy: actor.id,

		updatedBy: actor.id,
	});

	await auditLogService.log({
		business: businessId,
		entityType: AUDIT_ENTITY_TYPES.PRODUCT_IMAGE,
		entityId: image.id,
		action: AUDIT_ACTIONS.PRODUCT_IMAGE_CREATED,
		actor,
		requestMetadata,
		metadata: {
			productId: image.product,
			storageKey: image.storageKey,
			storageProvider: image.storageProvider,
			width: image.width,
			height: image.height,
			format: image.format,
			bytes: image.bytes,
			isPrimary: image.isPrimary,
			sortOrder: image.sortOrder,
		},
	});

	return populateImage(businessId, image.id);
}

/**
 * Image metadata only
 */
async function update({ businessId, imageId, data, actor, requestMetadata }) {
	await ensureBusinessExists(businessId);

	const image = await ensureImageExists(businessId, imageId);

	/*
	|--------------------------------------------------------------------------
	| Primary Image
	|--------------------------------------------------------------------------
	*/

	Object.assign(image, {
		altText: data.altText ?? image.altText,

		sortOrder: data.sortOrder ?? image.sortOrder,

		updatedBy: actor.id,
	});

	await productImageRepository.save(image);

	await auditLogService.log({
		business: businessId,
		entityType: AUDIT_ENTITY_TYPES.PRODUCT_IMAGE,
		entityId: image.id,
		action: AUDIT_ACTIONS.PRODUCT_IMAGE_UPDATED,
		actor,
		requestMetadata,
		metadata: {
			productId: getId(image.product),
			sortOrder: image.sortOrder,
		},
	});

	return populateImage(businessId, image.id);
}

async function list({ businessId, query }) {
	await ensureBusinessExists(businessId);

	const result = await productImageRepository.listByBusiness(
		businessId,
		query,
	);

	return productImagePresenter.presentCollection(result);
}

async function getById({ businessId, imageId }) {
	await ensureBusinessExists(businessId);

	const image = await ensureImageExists(businessId, imageId);

	return productImagePresenter.present(image);
}

/**
 * The only place that changes the primary image.
 */
async function setPrimary({ businessId, imageId, actor, requestMetadata }) {
	await ensureBusinessExists(businessId);

	const image = await ensureImageExists(businessId, imageId);

	await makePrimaryImage(image, actor.id);

	await auditLogService.log({
		business: businessId,
		entityType: AUDIT_ENTITY_TYPES.PRODUCT_IMAGE,
		entityId: image.id,
		action: AUDIT_ACTIONS.PRODUCT_IMAGE_SET_PRIMARY,
		actor,
		requestMetadata,
		metadata: {
			productId: getId(image.product),
		},
	});

	return populateImage(businessId, image.id);
}

/**
 * #### Optional Rollback Protection (Recommended)
 * - Right now, if: Cloudinary delete ✔ succeeds, Mongo delete ✖ fails i'll have an orphaned database record pointing to a missing asset. Conversely, if you delete MongoDB first and Cloudinary fails, you'll leave an orphaned Cloudinary asset.
 * - For now, the current order is recommend, because orphaned files are much cheaper than broken database references. Later, when i introduce background jobs (or an outbox pattern), i can retry failed Cloudinary deletions safely.
 */
async function remove({ businessId, imageId, actor, requestMetadata }) {
	await ensureBusinessExists(businessId);

	const image = await ensureImageExists(businessId, imageId);

	await ensurePrimaryImageCanBeRemoved(image);

	await imageStorageService.deleteProductImage(image.storageKey);

	await productImageRepository.remove(image);

	await auditLogService.log({
		business: businessId,
		entityType: AUDIT_ENTITY_TYPES.PRODUCT_IMAGE,
		entityId: image.id,
		action: AUDIT_ACTIONS.PRODUCT_IMAGE_DELETED,
		actor,
		requestMetadata,
		metadata: {
			productId: getId(image.product),
			storageKey: image.storageKey,
			isPrimary: image.isPrimary,
		},
	});

	return;
}

export default {
	create,
	update,
	list,
	getById,
	setPrimary,
	remove,
};
