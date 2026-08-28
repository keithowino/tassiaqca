import { inventoryFactory } from "../builders/index.js";

import { inventoryPresenter } from "../presenters/index.js";

import { inventoryRepository } from "../repositories/index.js";

import { variantsRepository } from "../../variants/repositories/index.js";

import {
	HTTP_STATUS,
	AppError,
	ErrorCodes,
	AUDIT_ENTITY_TYPES,
	AUDIT_ACTIONS,
	ensureOfferingSupportsComponent,
	OFFERING_COMPONENTS,
	ensureBusinessExists,
	ensureOfferingExists,
} from "../../../../../shared/index.js";

import { auditLogService } from "../../../../audit/index.js";

class InventoryService {
	ensureInventoryComponentSupported(offering) {
		return ensureOfferingSupportsComponent(
			offering,
			OFFERING_COMPONENTS.INVENTORY,
			"Inventory is not supported for this offering.",
		);
	}

	async ensureProductOffering(offering) {
		if (offering.type !== "PRODUCT") {
			throw new AppError(
				"Inventory is currently supported only for Product offerings.",
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.BAD_REQUEST,
			);
		}

		return offering;
	}

	async ensureVariantBelongsToOffering({
		businessId,
		offeringId,
		variantId,
	}) {
		if (!variantId) {
			return null;
		}

		const variant = await variantsRepository.findByOfferingAndId(
			offeringId,
			variantId,
		);

		if (!variant || String(variant.offering) !== String(offeringId)) {
			throw new AppError(
				"Offering variant not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		return variant;
	}

	async ensureInventoryDoesNotExist({
		businessId,
		offeringId,
		variantId = null,
	}) {
		const existing = await inventoryRepository.findByOffering(
			businessId,
			offeringId,
			variantId,
		);

		if (existing) {
			throw new AppError(
				variantId
					? "Inventory already exists for this offering variant."
					: "Inventory already exists for this offering.",
				HTTP_STATUS.CONFLICT,
				ErrorCodes.CONFLICT,
			);
		}
	}

	buildAuditMetadata(inventory) {
		return {
			offeringId: inventory.offering,
			quantity: inventory.quantity,
			reservedQuantity: inventory?.reservedQuantity || "nill",
			lowStockThreshold: inventory.lowStockThreshold,
			lowStock: inventory.lowStock,
		};
	}

	async create({ businessId, offeringId, data, actor, requestMetadata }) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureInventoryComponentSupported(offering);

		await this.ensureProductOffering(offering);

		await this.ensureVariantBelongsToOffering({
			businessId,
			offeringId,
			variantId: data.variantId,
		});

		await this.ensureInventoryDoesNotExist({
			businessId,
			offeringId,
			variantId: data.variantId ?? null,
		});

		const inventory = inventoryFactory.createInventory({
			businessId,
			offeringId,
			variantId: data.variantId ?? null,
			data,
			actor,
		});

		if (inventory.reservedQuantity > inventory.quantity) {
			throw new AppError(
				"Reserved quantity cannot exceed inventory quantity.",
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.BAD_REQUEST,
			);
		}

		const created = await inventoryRepository.create(inventory);

		await auditLogService.log({
			business: businessId,
			entityType: AUDIT_ENTITY_TYPES.INVENTORY,
			entityId: created.id,
			action: AUDIT_ACTIONS.INVENTORY_CREATED,
			actor,
			requestMetadata,
			metadata: this.buildAuditMetadata(created),
		});

		return inventoryPresenter.present(created);
	}

	async get({ businessId, offeringId, variantId = null }) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureInventoryComponentSupported(offering);

		await this.ensureProductOffering(offering);

		const inventory = await inventoryRepository.findByOffering(
			businessId,
			offeringId,
			variantId,
		);

		return inventoryPresenter.present(inventory);
	}

	async list({ businessId, offeringId }) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureInventoryComponentSupported(offering);

		await this.ensureProductOffering(offering);

		const inventories =
			await inventoryRepository.findByOfferingIncludingVariants(
				businessId,
				offeringId,
			);

		return inventoryPresenter.presentCollection(inventories);
	}

	async update({
		businessId,
		offeringId,
		variantId = null,
		data,
		actor,
		requestMetadata,
	}) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureInventoryComponentSupported(offering);

		await this.ensureProductOffering(offering);

		const inventory = await inventoryRepository.findByOffering(
			businessId,
			offeringId,
			variantId,
		);

		if (!inventory) {
			throw new AppError(
				"Inventory not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		const normalized = {
			...data,
		};

		const quantity = normalized.quantity ?? inventory.quantity;

		const reservedQuantity =
			normalized.reservedQuantity ?? inventory.reservedQuantity;

		if (reservedQuantity > quantity) {
			throw new AppError(
				"Reserved quantity cannot exceed inventory quantity.",
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.BAD_REQUEST,
			);
		}

		delete normalized.variantId;

		Object.assign(inventory, normalized);

		inventory.updatedBy = actor.id;

		const updated = await inventoryRepository.save(inventory);

		await auditLogService.log({
			business: businessId,
			entityType: AUDIT_ENTITY_TYPES.INVENTORY,
			entityId: updated.id,
			action: AUDIT_ACTIONS.INVENTORY_UPDATED,
			actor,
			requestMetadata,
			metadata: this.buildAuditMetadata(updated),
		});

		return inventoryPresenter.present(updated);
	}

	async archive({ businessId, offeringId }) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureInventoryComponentSupported(offering);

		await inventoryRepository.archiveByOffering(businessId, offeringId);

		return this.list({
			businessId,
			offeringId,
		});
	}

	async restore({ businessId, offeringId }) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureInventoryComponentSupported(offering);

		await inventoryRepository.restoreByOffering(businessId, offeringId);

		return this.list({
			businessId,
			offeringId,
		});
	}
}

export const inventoryService = new InventoryService();

export default inventoryService;
