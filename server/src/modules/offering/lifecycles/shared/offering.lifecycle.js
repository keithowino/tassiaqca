import { offeringRepository } from "../../repositories/index.js";
import { offeringPresenter } from "../../presenters/index.js";

import { auditLogService } from "../../../audit/index.js";

import {
	slugify,
	AUDIT_ACTIONS,
	AUDIT_ENTITY_TYPES,
	HTTP_STATUS,
	AppError,
	ErrorCodes,
	ensureBusinessExists,
} from "../../../../shared/index.js";

import { OFFERING_STATUS } from "../../constants/index.js";

import { offeringFactory } from "../../builders/index.js";

import { componentPipeline } from "../../components/index.js";

/**
 * This is the foundation for the next evolution. Once Product, Booking, Rental, Membership, Course, etc. become independent domains, each can provide its own lifecycle hooks (beforeCreate, afterCreate, beforeUpdate, publish, archive, pricing, inventory, scheduling, etc.) while continuing to reuse this shared lifecycle instead of duplicating CRUD logic.
 */

/*
|--------------------------------------------------------------------------
| Private Helpers
|--------------------------------------------------------------------------
*/

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

/**
 * #### Lifecycle Hooks
 *
 * Specialized lifecycles (Product, Rental, Booking, etc.) override these
 * hooks to inject domain-specific behavior without duplicating the shared
 * lifecycle implementation.
 */
const defaultHooks = {
	async validateCreate(context) {
		await componentPipeline.validateCreate(context);
	},

	async prepareCreate(context) {
		await componentPipeline.prepareCreate(context);
	},

	async beforeCreate(context) {
		await componentPipeline.beforeCreate(context);
	},

	async afterCreate(context) {
		await componentPipeline.afterCreate(context);
	},

	async validateUpdate(context) {
		await componentPipeline.validateUpdate(context);
	},

	async prepareUpdate(context) {
		await componentPipeline.prepareUpdate(context);
	},

	async beforeUpdate(context) {
		await componentPipeline.beforeUpdate(context);
	},

	async afterUpdate(context) {
		await componentPipeline.afterUpdate(context);
	},

	async beforeArchive(context) {
		await componentPipeline.beforeArchive(context);
	},

	async afterArchive(context) {
		await componentPipeline.afterArchive(context);
	},

	async beforeRestore(context) {
		await componentPipeline.beforeRestore(context);
	},

	async afterRestore(context) {
		await componentPipeline.afterRestore(context);
	},
};

/*
|--------------------------------------------------------------------------
| Lifecycle
|--------------------------------------------------------------------------
*/

async function create({
	businessId,
	data,
	actor,
	requestMetadata,
	registration = {},
}) {
	const hooks = registration.lifecycle?.hooks ?? defaultHooks;

	await ensureBusinessExists(businessId);

	const context = {
		businessId,
		data,
		actor,
		requestMetadata,
		registration,
		state: {},
	};

	// rm
	console.log("[Lifecycle] Incoming data", context.data);

	await hooks.validateCreate(context);

	await hooks.prepareCreate(context);

	await hooks.beforeCreate(context);

	const name = data.name.trim();

	await ensureOfferingNameIsUnique(businessId, name);

	const slug = await generateUniqueSlug(businessId, name);

	// rm
	console.log("[Lifecycle] Data before Offering repository", context.data);

	const offeringData = {
		businessId,
		data: {
			type: data.type,
			name,
			shortDescription: data.shortDescription,
			description: data.description,
			status: data.status,
			visibility: data.visibility,
			searchable: data.searchable,
			featured: data.featured,
			metadata: data.metadata,
		},
		slug,
		actor,
	};

	const offering = await offeringRepository.create(
		offeringFactory.createOffering(offeringData),
	);

	// rm
	console.log("[Lifecycle] Created Offering", offering);

	context.offering = offering;

	await hooks.afterCreate(context);

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

async function list({ businessId, query, registration = {} }) {
	const hooks = registration.lifecycle?.hooks ?? defaultHooks;

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

async function get({ businessId, offeringId, registration = {} }) {
	const hooks = registration.lifecycle?.hooks ?? defaultHooks;

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
	registration = {},
}) {
	const hooks = registration.lifecycle?.hooks ?? defaultHooks;

	await ensureBusinessExists(businessId);

	const offering = await ensureOfferingExists(businessId, offeringId);

	const context = {
		businessId,
		offering,
		data,
		actor,
		requestMetadata,
		registration,
		state: {},
	};

	await hooks.validateUpdate(context);

	await hooks.beforeUpdate(context);

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

	if (data.shortDescription !== undefined) {
		offering.shortDescription = data.shortDescription;
	}

	if (data.description !== undefined) {
		offering.description = data.description;
	}

	if (data.status !== undefined) {
		offering.status = data.status;
	}

	if (data.visibility !== undefined) {
		offering.visibility = data.visibility;
	}

	if (data.searchable !== undefined) {
		offering.searchable = data.searchable;
	}

	if (data.featured !== undefined) {
		offering.featured = data.featured;
	}

	if (data.metadata !== undefined) {
		offering.metadata = {
			...(offering.metadata ?? {}),
			...data.metadata,
		};
	}

	offering.updatedBy = actor.id;

	await offeringRepository.save(offering);

	await hooks.afterUpdate(context);

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

async function archive({
	businessId,
	offeringId,
	actor,
	requestMetadata,
	registration = {},
}) {
	const hooks = registration.lifecycle?.hooks ?? defaultHooks;

	await ensureBusinessExists(businessId);

	const offering = await ensureOfferingExists(businessId, offeringId);

	const context = {
		businessId,
		offering,
		actor,
		requestMetadata,
		registration,
		state: {},
	};

	await hooks.beforeArchive(context);

	offering.status = OFFERING_STATUS.ARCHIVED;

	offering.updatedBy = actor.id;

	await offeringRepository.save(offering);

	await hooks.afterArchive(context);

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

async function restore({
	businessId,
	offeringId,
	actor,
	requestMetadata,
	registration = {},
}) {
	const hooks = registration.lifecycle?.hooks ?? defaultHooks;

	await ensureBusinessExists(businessId);

	const offering = await ensureOfferingExists(businessId, offeringId);

	const context = {
		businessId,
		offering,
		actor,
		requestMetadata,
		registration,
		state: {},
	};

	await hooks.beforeRestore(context);

	offering.status = OFFERING_STATUS.ACTIVE;

	offering.updatedBy = actor.id;

	await offeringRepository.save(offering);

	await hooks.afterRestore(context);

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
	hooks: defaultHooks,

	create,
	list,
	get,
	update,
	archive,
	restore,
};
