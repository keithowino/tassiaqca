import mongoose from "mongoose";

import productPriceRepository from "../repositories/productPrice.repository.js";
import productRepository from "../repositories/product.repository.js";

import productPricePresenter from "../presenters/productPrice.presenter.js";

import businessRepository from "../../business/repositories/business.repository.js";

import { auditLogService } from "../../audit/index.js";

import {
	AUDIT_ACTIONS,
	AUDIT_ENTITY_TYPES,
	HTTP_STATUS,
	PRODUCT_PRICE_STATUS,
} from "../../../shared/constants/index.js";

import { AppError, ErrorCodes } from "../../../shared/errors/index.js";

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

async function ensurePriceExists(businessId, priceId) {
	const price = await productPriceRepository.findByBusinessAndId(
		businessId,
		priceId,
	);

	if (!price) {
		throw new AppError(
			"Product price not found.",
			HTTP_STATUS.NOT_FOUND,
			ErrorCodes.NOT_FOUND,
		);
	}

	return price;
}

async function populatePrice(businessId, priceId) {
	const price = await productPriceRepository.findByBusinessAndId(
		businessId,
		priceId,
	);

	return productPricePresenter.present(price);
}

async function retireCurrentPrice(productId, actor, session) {
	const currentPrice =
		await productPriceRepository.findCurrentByProduct(productId);

	if (!currentPrice) {
		return;
	}

	currentPrice.isCurrent = false;
	currentPrice.status = PRODUCT_PRICE_STATUS.INACTIVE;
	currentPrice.effectiveTo = new Date();
	currentPrice.updatedBy = actor.id;

	await productPriceRepository.save(currentPrice, session);
}

/*
|--------------------------------------------------------------------------
| Public Service
|--------------------------------------------------------------------------
*/

async function create({ businessId, data, actor, requestMetadata }) {
	await ensureBusinessExists(businessId);

	await ensureProductExists(businessId, data.productId);

	const session = await mongoose.startSession();

	try {
		session.startTransaction();

		await retireCurrentPrice(data.productId, actor, session);

		const price = await productPriceRepository.create(
			{
				business: businessId,

				product: data.productId,

				sellingPrice: data.sellingPrice,

				costPrice: data.costPrice,

				currency: data.currency,

				effectiveFrom: data.effectiveFrom ?? new Date(),

				changeReason: data.changeReason,

				isCurrent: true,

				status: PRODUCT_PRICE_STATUS.ACTIVE,

				createdBy: actor.id,

				updatedBy: actor.id,
			},
			session,
		);

		await auditLogService.log({
			business: businessId,

			actor,

			action: AUDIT_ACTIONS.PRODUCT_PRICE_CREATED,

			entityType: AUDIT_ENTITY_TYPES.PRODUCT_PRICE,

			entityId: price.id,

			requestMetadata,

			metadata: {
				productId: data.productId,

				sellingPrice: price.sellingPrice,

				currency: price.currency,

				isCurrent: true,
			},
		});

		await session.commitTransaction();

		return populatePrice(businessId, price.id);
	} catch (error) {
		await session.abortTransaction();

		throw error;
	} finally {
		await session.endSession();
	}
}

async function list({ businessId, query }) {
	await ensureBusinessExists(businessId);

	const result = await productPriceRepository.listByBusiness(
		businessId,
		query,
	);

	return productPricePresenter.presentCollection(result);
}

async function getById({ businessId, priceId }) {
	await ensureBusinessExists(businessId);

	const price = await ensurePriceExists(businessId, priceId);

	return productPricePresenter.present(price);
}

export default {
	create,
	list,
	getById,
};
