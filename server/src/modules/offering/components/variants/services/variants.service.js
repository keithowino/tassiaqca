import mongoose from "mongoose";

import { variantsFactory } from "../builders/index.js";
import { variantsPresenter } from "../presenters/index.js";
import { variantsRepository } from "../repositories/index.js";

import { normalizeVariant, normalizeVariants } from "../validators/index.js";

import {
	ensureBusinessExists,
	ensureOfferingExists,
} from "../../shared/index.js";

import { attributesRepository } from "../../attributes/repositories/index.js";

import { auditLogService } from "../../../../audit/index.js";

import {
	AUDIT_ACTIONS,
	AUDIT_ENTITY_TYPES,
	HTTP_STATUS,
	AppError,
	ErrorCodes,
	ensureOfferingSupportsComponent,
	OFFERING_COMPONENTS,
} from "../../../../../shared/index.js";

class VariantsService {
	ensureVariantsComponentSupported(offering) {
		return ensureOfferingSupportsComponent(
			offering,
			OFFERING_COMPONENTS.VARIANTS,
			"Variants are not supported for this offering.",
		);
	}

	buildAuditMetadata(data) {
		return {
			offeringId: data.offeringId,
			sku: data.sku,
			attributes: data.attributes,
			attributeSignature: data.attributeSignature,
			status: data.status,
		};
	}

	async ensureProductOffering(offering) {
		if (offering.type !== "PRODUCT") {
			throw new AppError(
				"Variants are currently supported only for Product offerings.",
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.BAD_REQUEST,
			);
		}
	}

	async ensureSkuIsUnique(businessId, sku, excludeId = null) {
		const existing = await variantsRepository.findByBusinessAndSku(
			businessId,
			sku,
		);

		if (existing && String(existing.id) !== String(excludeId)) {
			throw new AppError(
				"A variant with this SKU already exists.",
				HTTP_STATUS.CONFLICT,
				ErrorCodes.CONFLICT,
			);
		}
	}

	async ensureAttributesExist(offeringId, attributes) {
		const definitions =
			await attributesRepository.findByOffering(offeringId);

		for (const selected of attributes) {
			const definition = definitions.find(
				(attribute) =>
					attribute.name.toLowerCase() ===
					selected.name.toLowerCase(),
			);

			if (!definition) {
				throw new AppError(
					`Variant attribute "${selected.name}" is not defined for this offering.`,
					HTTP_STATUS.BAD_REQUEST,
					ErrorCodes.BAD_REQUEST,
				);
			}

			const validValue = definition.values.some(
				(value) => value.toLowerCase() === selected.value.toLowerCase(),
			);

			if (!validValue) {
				throw new AppError(
					`Value "${selected.value}" is not valid for attribute "${definition.name}".`,
					HTTP_STATUS.BAD_REQUEST,
					ErrorCodes.BAD_REQUEST,
				);
			}
		}
	}

	async ensureSignatureIsUnique(
		offeringId,
		attributeSignature,
		excludeId = null,
	) {
		const existing = await variantsRepository.findByOfferingAndSignature(
			offeringId,
			attributeSignature,
			excludeId,
		);

		if (existing) {
			throw new AppError(
				"This attribute combination already exists for this offering.",
				HTTP_STATUS.CONFLICT,
				ErrorCodes.CONFLICT,
			);
		}
	}

	async create({ businessId, offeringId, data, actor, requestMetadata }) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureVariantsComponentSupported(offering);

		await this.ensureProductOffering(offering);

		const variant = normalizeVariant(data);

		await this.ensureSkuIsUnique(businessId, variant.sku);

		await this.ensureAttributesExist(offeringId, variant.attributes);

		await this.ensureSignatureIsUnique(
			offeringId,
			variant.attributeSignature,
		);

		const document = variantsFactory.createVariant({
			businessId,
			offeringId,
			variant,
			actor,
		});

		const created = await variantsRepository.create(document);

		await auditLogService.log({
			business: businessId,
			entityType: AUDIT_ENTITY_TYPES.OFFERING_VARIANT,
			entityId: created.id,
			action: AUDIT_ACTIONS.OFFERING_VARIANT_CREATED,
			actor,
			requestMetadata,
			metadata: this.buildAuditMetadata(created),
		});

		return variantsPresenter.present(created);
	}

	async list({ businessId, offeringId, includeArchived = true }) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureVariantsComponentSupported(offering);

		await this.ensureProductOffering(offering);

		const variants = await variantsRepository.findByOffering(offeringId, {
			includeArchived,
		});

		return variantsPresenter.presentCollection(variants);
	}

	async getById({ businessId, offeringId, variantId }) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureVariantsComponentSupported(offering);

		await this.ensureProductOffering(offering);

		const variant = await variantsRepository.findByOfferingAndId(
			offeringId,
			variantId,
		);

		if (!variant) {
			throw new AppError(
				"Offering variant not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		return variantsPresenter.present(variant);
	}

	async update({
		businessId,
		offeringId,
		variantId,
		data,
		actor,
		requestMetadata,
	}) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureVariantsComponentSupported(offering);

		await this.ensureProductOffering(offering);

		const variant = await variantsRepository.findByOfferingAndId(
			offeringId,
			variantId,
		);

		if (!variant) {
			throw new AppError(
				"Offering variant not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		const normalized = normalizeVariant({
			sku: data.sku ?? variant.sku,
			slug: data.slug ?? variant.slug,
			attributes: data.attributes ?? variant.attributes,
			status: data.status ?? variant.status,
		});

		if (normalized.sku !== variant.sku) {
			await this.ensureSkuIsUnique(
				businessId,
				normalized.sku,
				variant.id,
			);
		}

		await this.ensureAttributesExist(offeringId, normalized.attributes);

		if (normalized.attributeSignature !== variant.attributeSignature) {
			await this.ensureSignatureIsUnique(
				offeringId,
				normalized.attributeSignature,
				variant.id,
			);
		}

		variant.sku = normalized.sku;
		variant.slug = normalized.slug;
		variant.attributes = normalized.attributes;
		variant.attributeCount = normalized.attributeCount;
		variant.attributeSignature = normalized.attributeSignature;
		variant.status = normalized.status;
		variant.updatedBy = actor.id;

		const updated = await variantsRepository.save(variant);

		await auditLogService.log({
			business: businessId,
			entityType: AUDIT_ENTITY_TYPES.OFFERING_VARIANT,
			entityId: updated.id,
			action: AUDIT_ACTIONS.OFFERING_VARIANT_UPDATED,
			actor,
			requestMetadata,
			metadata: this.buildAuditMetadata(updated),
		});

		return variantsPresenter.present(updated);
	}

	async archive({
		businessId,
		offeringId,
		variantId,
		actor,
		requestMetadata,
	}) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureVariantsComponentSupported(offering);

		await this.ensureProductOffering(offering);

		const variant = await variantsRepository.findByOfferingAndId(
			offeringId,
			variantId,
		);

		if (!variant) {
			throw new AppError(
				"Offering variant not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		if (variant.status === "ARCHIVED") {
			throw new AppError(
				"Offering variant is already archived.",
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.BAD_REQUEST,
			);
		}

		variant.status = "ARCHIVED";
		variant.updatedBy = actor.id;

		const archived = await variantsRepository.save(variant);

		await auditLogService.log({
			business: businessId,
			entityType: AUDIT_ENTITY_TYPES.OFFERING_VARIANT,
			entityId: archived.id,
			action: AUDIT_ACTIONS.OFFERING_VARIANT_ARCHIVED,
			actor,
			requestMetadata,
			metadata: this.buildAuditMetadata(archived),
		});

		return variantsPresenter.present(archived);
	}

	async restore({
		businessId,
		offeringId,
		variantId,
		actor,
		requestMetadata,
	}) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureVariantsComponentSupported(offering);

		await this.ensureProductOffering(offering);

		const variant = await variantsRepository.findByOfferingAndId(
			offeringId,
			variantId,
		);

		if (!variant) {
			throw new AppError(
				"Offering variant not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		if (variant.status === "ACTIVE") {
			throw new AppError(
				"Offering variant is already active.",
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.BAD_REQUEST,
			);
		}

		variant.status = "ACTIVE";
		variant.updatedBy = actor.id;

		const restored = await variantsRepository.save(variant);

		await auditLogService.log({
			business: businessId,
			entityType: AUDIT_ENTITY_TYPES.OFFERING_VARIANT,
			entityId: restored.id,
			action: AUDIT_ACTIONS.OFFERING_VARIANT_RESTORED,
			actor,
			requestMetadata,
			metadata: this.buildAuditMetadata(restored),
		});

		return variantsPresenter.present(restored);
	}

	/**
	 * Used by the Offering component lifecycle.
	 *
	 * Supplying variants replaces the Offering's current
	 * variant collection.
	 */
	async setVariants({ businessId, offeringId, variants = [], actor }) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureVariantsComponentSupported(offering);

		await this.ensureProductOffering(offering);

		const normalized = normalizeVariants(variants);

		const seenSkus = new Set();
		const seenSignatures = new Set();

		for (const variant of normalized) {
			if (seenSkus.has(variant.sku)) {
				throw new AppError(
					`Duplicate variant SKU "${variant.sku}".`,
					HTTP_STATUS.CONFLICT,
					ErrorCodes.CONFLICT,
				);
			}

			if (seenSignatures.has(variant.attributeSignature)) {
				throw new AppError(
					"Duplicate variant attribute combination.",
					HTTP_STATUS.CONFLICT,
					ErrorCodes.CONFLICT,
				);
			}

			seenSkus.add(variant.sku);
			seenSignatures.add(variant.attributeSignature);

			await this.ensureAttributesExist(offeringId, variant.attributes);

			await this.ensureSkuIsUnique(businessId, variant.sku);
		}

		const session = await mongoose.startSession();

		try {
			session.startTransaction();

			await variantsRepository.deleteByOffering(offeringId, session);

			const documents = normalized.map((variant) =>
				variantsFactory.createVariant({
					businessId,
					offeringId,
					variant,
					actor,
				}),
			);

			const created = await variantsRepository.createMany(
				documents,
				session,
			);

			await session.commitTransaction();

			return variantsPresenter.presentCollection(created);
		} catch (error) {
			await session.abortTransaction();
			throw error;
		} finally {
			await session.endSession();
		}
	}
}

export const variantsService = new VariantsService();

export default variantsService;
