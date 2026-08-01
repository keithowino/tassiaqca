import inventoryRepository from "../repositories/inventory.repository.js";
import inventoryPresenter from "../presenters/inventory.presenter.js";

import businessRepository from "../../business/repositories/business.repository.js";
import productRepository from "../repositories/product.repository.js";

import { auditLogService } from "../../audit/index.js";

import {
	INVENTORY_STATUS,
	AUDIT_ACTIONS,
	AUDIT_ENTITY_TYPES,
	HTTP_STATUS,
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

async function ensureInventoryExists(businessId, inventoryId) {
	const inventory = await inventoryRepository.findByBusinessAndId(
		businessId,
		inventoryId,
	);

	if (!inventory) {
		throw new AppError(
			"Inventory not found.",
			HTTP_STATUS.NOT_FOUND,
			ErrorCodes.NOT_FOUND,
		);
	}

	return inventory;
}

async function ensureInventoryDoesNotExist(businessId, productId) {
	const existing = await inventoryRepository.findByBusinessAndProduct(
		businessId,
		productId,
	);

	if (existing) {
		throw new AppError(
			"Inventory already exists for this product.",
			HTTP_STATUS.CONFLICT,
			ErrorCodes.CONFLICT,
		);
	}
}

async function validateReservedQuantity(quantity, reservedQuantity) {
	if (reservedQuantity > quantity) {
		throw new AppError(
			"Reserved quantity cannot exceed available quantity.",
			HTTP_STATUS.BAD_REQUEST,
			ErrorCodes.VALIDATION_ERROR,
		);
	}
}

/*
|--------------------------------------------------------------------------
| Public Service
|--------------------------------------------------------------------------
*/

async function create({ businessId, data, actor, requestMetadata }) {
	await ensureBusinessExists(businessId);

	await ensureProductExists(businessId, data.productId);

	await ensureInventoryDoesNotExist(businessId, data.productId);

	await validateReservedQuantity(
		data.quantity ?? 0,
		data.reservedQuantity ?? 0,
	);

	const inventory = await inventoryRepository.create({
		business: businessId,

		product: data.productId,

		quantity: data.quantity,
		reservedQuantity: data.reservedQuantity,
		lowStockThreshold: data.lowStockThreshold,

		createdBy: actor.id,
		updatedBy: actor.id,
	});

	await auditLogService.log({
		business: businessId,
		entityType: AUDIT_ENTITY_TYPES.INVENTORY,
		entityId: inventory.id,
		action: AUDIT_ACTIONS.INVENTORY_CREATED,
		actor,

		requestMetadata,

		metadata: {
			productId: inventory.product,
			quantity: inventory.quantity,
			reservedQuantity: inventory.reservedQuantity,
			lowStockThreshold: inventory.lowStockThreshold,
			status: inventory.status,
		},
	});

	const populatedInventory = await inventoryRepository.findByBusinessAndId(
		businessId,
		inventory.id,
	);

	return inventoryPresenter.present(populatedInventory);
}

async function update({
	businessId,
	inventoryId,
	data,
	actor,
	requestMetadata,
}) {
	await ensureBusinessExists(businessId);

	const inventory = await ensureInventoryExists(businessId, inventoryId);

	const quantity = data.quantity ?? inventory.quantity;

	const reservedQuantity =
		data.reservedQuantity ?? inventory.reservedQuantity;

	await validateReservedQuantity(quantity, reservedQuantity);

	Object.assign(inventory, {
		...data,
		updatedBy: actor.id,
	});

	await inventoryRepository.save(inventory);

	await auditLogService.log({
		business: businessId,
		entityType: AUDIT_ENTITY_TYPES.INVENTORY,
		entityId: inventory.id,
		action: AUDIT_ACTIONS.INVENTORY_UPDATED,
		actor,

		requestMetadata,

		metadata: {
			productId: inventory.product,
			quantity: inventory.quantity,
			reservedQuantity: inventory.reservedQuantity,
			lowStockThreshold: inventory.lowStockThreshold,
			status: inventory.status,
		},
	});

	const populatedInventory = await inventoryRepository.findByBusinessAndId(
		businessId,
		inventory.id,
	);

	return inventoryPresenter.present(populatedInventory);
}

async function list({ businessId, query }) {
	await ensureBusinessExists(businessId);

	const result = await inventoryRepository.listByBusiness(businessId, query);

	return inventoryPresenter.presentCollection(result);
}

async function getById({ businessId, inventoryId }) {
	await ensureBusinessExists(businessId);

	const inventory = await ensureInventoryExists(businessId, inventoryId);

	return inventoryPresenter.present(inventory);
}

/**
 * #### Placeholder
 */
async function adjustStock() {
	throw new AppError(
		"Inventory stock adjustments are not yet implemented.",
		HTTP_STATUS.NOT_IMPLEMENTED,
		ErrorCodes.NOT_IMPLEMENTED,
	);
}

async function archive({ businessId, inventoryId, actor, requestMetadata }) {
	await ensureBusinessExists(businessId);

	const inventory = await ensureInventoryExists(businessId, inventoryId);

	inventory.status = INVENTORY_STATUS.ARCHIVED;
	inventory.updatedBy = actor.id;

	await inventoryRepository.save(inventory);

	await auditLogService.log({
		business: businessId,
		entityType: AUDIT_ENTITY_TYPES.INVENTORY,
		entityId: inventory.id,
		action: AUDIT_ACTIONS.INVENTORY_ARCHIVED,
		actor,

		requestMetadata,

		metadata: {
			productId: inventory.product,
			quantity: inventory.quantity,
			reservedQuantity: inventory.reservedQuantity,
			lowStockThreshold: inventory.lowStockThreshold,
			status: inventory.status,
		},
	});

	const populatedInventory = await inventoryRepository.findByBusinessAndId(
		businessId,
		inventory.id,
	);

	return inventoryPresenter.present(populatedInventory);
}

async function restore({ businessId, inventoryId, actor, requestMetadata }) {
	await ensureBusinessExists(businessId);

	const inventory = await ensureInventoryExists(businessId, inventoryId);

	inventory.status = INVENTORY_STATUS.ACTIVE;
	inventory.updatedBy = actor.id;

	await inventoryRepository.save(inventory);

	await auditLogService.log({
		business: businessId,
		entityType: AUDIT_ENTITY_TYPES.INVENTORY,
		entityId: inventory.id,
		action: AUDIT_ACTIONS.INVENTORY_RESTORED,
		actor,

		requestMetadata,

		metadata: {
			productId: inventory.product,
			quantity: inventory.quantity,
			reservedQuantity: inventory.reservedQuantity,
			lowStockThreshold: inventory.lowStockThreshold,
			status: inventory.status,
		},
	});

	const populatedInventory = await inventoryRepository.findByBusinessAndId(
		businessId,
		inventory.id,
	);

	return inventoryPresenter.present(populatedInventory);
}

export default {
	create,
	update,
	list,
	getById,
	adjustStock,
	archive,
	restore,
};
