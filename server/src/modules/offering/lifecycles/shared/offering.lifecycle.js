import { offeringRepository } from "../../repositories/index.js";
import { offeringPresenter } from "../../presenters/index.js";

import businessRepository from "../../../business/repositories/business.repository.js";
import { auditLogService } from "../../../audit/index.js";

import slugify from "../../../../shared/utils/slugify.js";

import {
	AUDIT_ACTIONS,
	AUDIT_ENTITY_TYPES,
	HTTP_STATUS,
} from "../../../../shared/constants/index.js";

import { OFFERING_STATUS } from "../../constants/index.js";

import { AppError, ErrorCodes } from "../../../../shared/errors/index.js";

import { offeringFactory } from "../../builders/index.js";

/**
 * This is the foundation for the next evolution. Once Product, Booking, Rental, Membership, Course, etc. become independent domains, each can provide its own lifecycle hooks (beforeCreate, afterCreate, beforeUpdate, publish, archive, pricing, inventory, scheduling, etc.) while continuing to reuse this shared lifecycle instead of duplicating CRUD logic.
 */

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

async function ensureOfferingExists(businessId, offeringId) {
	const offering = await offeringRepository.findByBusinessAndId(
		businessId,
		offeringId,
	);

	if (!offering) {
		throw new AppError(
			"Offering not found.",
			HTTP_STATUS.NOT_FOUND,
			ErrorCodes.NOT_FOUND,
		);
	}

	return offering;
}

async function ensureOfferingNameIsUnique(businessId, name, excludeId = null) {
	const existing = await offeringRepository.findByBusinessAndName(
		businessId,
		name,
		excludeId,
	);

	if (existing) {
		throw new AppError(
			"An offering with this name already exists.",
			HTTP_STATUS.CONFLICT,
			ErrorCodes.CONFLICT,
		);
	}
}

async function generateUniqueSlug(businessId, name, excludeId = null) {
	const baseSlug = slugify(name);

	let slug = baseSlug;

	let counter = 2;

	while (
		await offeringRepository.existsByBusinessAndSlug(
			businessId,
			slug,
			excludeId,
		)
	) {
		slug = `${baseSlug}-${counter++}`;
	}

	return slug;
}

function buildAuditMetadata(offering) {
	return {
		name: offering.name,
		type: offering.type,
		status: offering.status,
		visibility: offering.visibility,
		slug: offering.slug,
	};
}

/*
|--------------------------------------------------------------------------
| Lifecycle
|--------------------------------------------------------------------------
*/

async function create({ businessId, data, actor, requestMetadata }) {
	await ensureBusinessExists(businessId);

	const name = data.name.trim();

	await ensureOfferingNameIsUnique(businessId, name);

	const slug = await generateUniqueSlug(businessId, name);

	const offering = await offeringRepository.create(
		offeringFactory.createOffering({
			businessId,
			data: {
				...data,
				name,
			},
			slug,
			actor,
		}),
	);

	await auditLogService.log({
		business: businessId,
		entityType: AUDIT_ENTITY_TYPES.OFFERING,
		entityId: offering.id,
		action: AUDIT_ACTIONS.OFFERING_CREATED,
		actor,
		requestMetadata,
		metadata: buildAuditMetadata(offering),
	});

	return offeringPresenter.present(offering);
}

async function list({ businessId, query }) {
	await ensureBusinessExists(businessId);

	const page = query.page ?? 1;
	const limit = query.limit ?? 20;

	const skip = (page - 1) * limit;

	const { data, total } = await offeringRepository.findByBusiness(
		businessId,
		{
			...query,
			skip,
			limit,
		},
	);

	return {
		data: offeringPresenter.presentCollection(data),

		pagination: {
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit),
		},
	};
}

async function get({ businessId, offeringId }) {
	await ensureBusinessExists(businessId);

	const offering = await ensureOfferingExists(businessId, offeringId);

	return offeringPresenter.present(offering);
}

async function update({
	businessId,
	offeringId,
	data,
	actor,
	requestMetadata,
}) {
	await ensureBusinessExists(businessId);

	const offering = await ensureOfferingExists(businessId, offeringId);

	if (data.name) {
		const name = data.name.trim();

		if (name !== offering.name) {
			await ensureOfferingNameIsUnique(businessId, name, offering.id);

			offering.name = name;

			offering.slug = await generateUniqueSlug(
				businessId,
				name,
				offering.id,
			);
		}
	}

	Object.assign(offering, data);

	offering.updatedBy = actor.id;

	await offeringRepository.save(offering);

	await auditLogService.log({
		business: businessId,
		entityType: AUDIT_ENTITY_TYPES.OFFERING,
		entityId: offering.id,
		action: AUDIT_ACTIONS.OFFERING_UPDATED,
		actor,
		requestMetadata,
		metadata: buildAuditMetadata(offering),
	});

	return offeringPresenter.present(offering);
}

async function archive({ businessId, offeringId, actor, requestMetadata }) {
	await ensureBusinessExists(businessId);

	const offering = await ensureOfferingExists(businessId, offeringId);

	offering.status = OFFERING_STATUS.ARCHIVED;

	offering.updatedBy = actor.id;

	await offeringRepository.save(offering);

	await auditLogService.log({
		business: businessId,
		entityType: AUDIT_ENTITY_TYPES.OFFERING,
		entityId: offering.id,
		action: AUDIT_ACTIONS.OFFERING_ARCHIVED,
		actor,
		requestMetadata,
		metadata: buildAuditMetadata(offering),
	});

	return offeringPresenter.present(offering);
}

async function restore({ businessId, offeringId, actor, requestMetadata }) {
	await ensureBusinessExists(businessId);

	const offering = await ensureOfferingExists(businessId, offeringId);

	offering.status = OFFERING_STATUS.ACTIVE;

	offering.updatedBy = actor.id;

	await offeringRepository.save(offering);

	await auditLogService.log({
		business: businessId,
		entityType: AUDIT_ENTITY_TYPES.OFFERING,
		entityId: offering.id,
		action: AUDIT_ACTIONS.OFFERING_RESTORED,
		actor,
		requestMetadata,
		metadata: buildAuditMetadata(offering),
	});

	return offeringPresenter.present(offering);
}

export default {
	create,
	list,
	get,
	update,
	archive,
	restore,
};
