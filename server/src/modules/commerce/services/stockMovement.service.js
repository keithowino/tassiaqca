import mongoose from "mongoose";

import inventoryRepository from "../repositories/inventory.repository.js";
import stockMovementRepository from "../repositories/stockMovement.repository.js";

import stockMovementPresenter from "../presenters/stockMovement.presenter.js";

import {
	STOCK_MOVEMENT,
	STOCK_MOVEMENT_STATUS,
	AUDIT_ACTIONS,
	AUDIT_ENTITY_TYPES,
	HTTP_STATUS,
} from "../../../shared/constants/index.js";

import businessRepository from "../../business/repositories/business.repository.js";
import { auditLogService } from "../../audit/index.js";

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

async function ensureMovementExists(businessId, movementId) {
	const movement = await stockMovementRepository.findByBusinessAndId(
		businessId,
		movementId,
	);

	if (!movement) {
		throw new AppError(
			"Stock movement not found.",
			HTTP_STATUS.NOT_FOUND,
			ErrorCodes.NOT_FOUND,
		);
	}

	return movement;
}

function validateMovementQuantity(type, quantityBefore, movementQuantity) {
	switch (type) {
		case STOCK_MOVEMENT.STOCK_IN:
			return;

		case STOCK_MOVEMENT.STOCK_OUT:
			if (quantityBefore - movementQuantity < 0) {
				throw new AppError(
					"Insufficient inventory.",
					HTTP_STATUS.BAD_REQUEST,
					ErrorCodes.VALIDATION_ERROR,
				);
			}

			return;

		case STOCK_MOVEMENT.ADJUSTMENT:
			if (quantityBefore + movementQuantity < 0) {
				throw new AppError(
					"Inventory cannot become negative.",
					HTTP_STATUS.BAD_REQUEST,
					ErrorCodes.VALIDATION_ERROR,
				);
			}

			return;

		default:
			throw new AppError(
				"Invalid stock movement type.",
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.VALIDATION_ERROR,
			);
	}
}

function calculateNewQuantity(type, quantityBefore, movementQuantity) {
	switch (type) {
		case STOCK_MOVEMENT.STOCK_IN:
			return quantityBefore + movementQuantity;

		case STOCK_MOVEMENT.STOCK_OUT:
			return quantityBefore - movementQuantity;

		case STOCK_MOVEMENT.ADJUSTMENT:
			return quantityBefore + movementQuantity;

		default:
			throw new AppError(
				"Invalid stock movement type.",
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.VALIDATION_ERROR,
			);
	}
}

async function createMovement({
	businessId,
	inventory,
	data,
	quantityBefore,
	quantityAfter,
	actor,
	session,
}) {
	return stockMovementRepository.create(
		{
			business: businessId,
			inventory: inventory.id,
			product: inventory.product,
			type: data.type,
			quantity: data.quantity,
			quantityBefore,
			quantityAfter,
			reason: data.reason,
			notes: data.notes,
			status: STOCK_MOVEMENT_STATUS.COMPLETED,
			createdBy: actor.id,
		},
		session,
	);
}

async function populateMovement(businessId, movementId) {
	const movement = await stockMovementRepository.findByBusinessAndId(
		businessId,
		movementId,
	);

	return stockMovementPresenter.present(movement);
}

/*
|--------------------------------------------------------------------------
| Public Service
|--------------------------------------------------------------------------
*/

async function create({ businessId, data, actor, requestMetadata }) {
	await ensureBusinessExists(businessId);

	const inventory = await ensureInventoryExists(businessId, data.inventoryId);

	const quantityBefore = inventory.quantity;

	validateMovementQuantity(data.type, quantityBefore, data.quantity);

	const quantityAfter = calculateNewQuantity(
		data.type,
		quantityBefore,
		data.quantity,
	);

	const session = await mongoose.startSession();

	try {
		session.startTransaction();

		inventory.quantity = quantityAfter;
		inventory.updatedBy = actor.id;

		await inventoryRepository.save(inventory, session);

		const movement = await createMovement({
			businessId,
			inventory,
			data,
			quantityBefore,
			quantityAfter,
			actor,
			session,
		});

		await auditLogService.log({
			business: businessId,
			actor,
			action: AUDIT_ACTIONS.STOCK_MOVEMENT_CREATE,
			entityType: AUDIT_ENTITY_TYPES.STOCK_MOVEMENT,
			entityId: movement.id,
			metadata: {
				type: movement.type,
				quantity: movement.quantity,
				quantityBefore,
				quantityAfter,
			},
			requestMetadata,
		});

		await session.commitTransaction();

		return populateMovement(businessId, movement.id);
	} catch (error) {
		await session.abortTransaction();
		throw error;
	} finally {
		await session.endSession();
	}
}

async function list({ businessId, query }) {
	await ensureBusinessExists(businessId);

	const result = await stockMovementRepository.listByBusiness(
		businessId,
		query,
	);

	return stockMovementPresenter.presentCollection(result);
}

async function getById({ businessId, movementId }) {
	await ensureBusinessExists(businessId);

	const movement = await ensureMovementExists(businessId, movementId);

	return stockMovementPresenter.present(movement);
}

export default {
	create,
	list,
	getById,
};
