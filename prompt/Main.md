Let's proceed to implementing the remaining projection types:

- Service
- Rental
- Membership
- Booking
- Event
- Course
- Subscription
- Package
- Digital Download

For your information here are the current states of the following files:

```js
`~\server\src\shared\platform\registry\registry.js`;

import {
	exists,
	filterBy,
	findBy,
	getAll,
	getById,
	groupBy,
} from "./registry.utils.js";

/**
 * Registry-driven architecture now exists:
 *
 * - Business Types
 * - Modules
 * - Capabilities
 * - builder
 * - Offering lifecycle
 * - configuration
 * - projection
 */
export const createRegistry = (items, keySelector = (item) => item.id) => {
	const registry = new Map();

	for (const item of items) {
		const key = keySelector(item);

		if (registry.has(key)) {
			throw new Error(`Duplicate registry key "${key}".`);
		}

		registry.set(key, Object.freeze(item));
	}

	Object.freeze(items);

	return Object.freeze({
		get: (id) => getById(registry, id),

		getAll: () => getAll(registry),

		exists: (id) => exists(registry, id),

		find: (predicate) => findBy(registry, predicate),

		filter: (predicate) => filterBy(registry, predicate),

		groupBy: (selector) => groupBy(registry, selector),
	});
};
```

```js
`~\server\src\shared\platform\registry\registry.utils.js`;

export const getById = (registry, id) => registry.get(id);

export const getAll = (registry) => [...registry.values()];

export const exists = (registry, id) => registry.has(id);

export const filterBy = (registry, predicate) =>
	getAll(registry).filter(predicate);

export const findBy = (registry, predicate) => getAll(registry).find(predicate);

export const groupBy = (registry, selector) => {
	return getAll(registry).reduce((groups, item) => {
		const key = selector(item);

		if (!groups[key]) {
			groups[key] = [];
		}

		groups[key].push(item);

		return groups;
	}, {});
};
```

```js
`~\server\src\shared\platform\offerings\offering.registry.js`;

import { OFFERING_TYPES } from "./offering.constants.js";
import { OFFERING_CATEGORIES } from "./offeringCategory.constants.js";

import { createRegistry } from "../registry/registry.js";

import { buildOffering } from "../../../modules/offering/builders/index.js";

import {
	productLifecycle,
	serviceLifecycle,
	bookingLifecycle,
	rentalLifecycle,
	membershipLifecycle,
	subscriptionLifecycle,
	courseLifecycle,
	eventLifecycle,
	packageLifecycle,
	digitalDownloadLifecycle,
} from "../../../modules/offering/lifecycles/index.js";

import {
	OFFERING_STATUS,
	OFFERING_VISIBILITY,
} from "../../../modules/offering/constants/index.js";

import { productProjection } from "../../../modules/commerce/adapters/index.js";

import { noopProjection } from "../../../modules/offering/projections/index.js";

/**
 * For now, every type will use the generic OfferingBuilder. As Product, Booking, Rental, Course, etc. evolve, you simply replace the mapping—without touching the service.
 */
const baseOffering = {
	builder: buildOffering,

	lifecycle: null,

	projection: noopProjection,

	capabilities: [],

	modules: [],

	marketplace: {
		searchable: true,
		discoverable: true,
	},

	configuration: {
		supportsVariants: false,
		supportsInventory: false,
		supportsScheduling: false,
	},

	defaults: {
		status: OFFERING_STATUS.DRAFT,

		visibility: OFFERING_VISIBILITY.PRIVATE,

		searchable: true,

		featured: false,

		metadata: {},
	},
};

const offerings = [
	{
		...baseOffering,

		type: OFFERING_TYPES.PRODUCT,
		lifecycle: productLifecycle,
		projection: productProjection,
		category: OFFERING_CATEGORIES.PHYSICAL,
		label: "Product",
		description: "Physical goods sold by a business.",

		configuration: {
			...baseOffering.configuration,
			supportsVariants: true,
			supportsInventory: true,
		},
	},

	{
		...baseOffering,

		type: OFFERING_TYPES.SERVICE,
		lifecycle: serviceLifecycle,

		/**
		 * Default projection for now.
		 */
		projection: noopProjection,
		category: OFFERING_CATEGORIES.TIME_BASED,
		label: "Service",
		description: "Professional or business service.",

		configuration: {
			...baseOffering.configuration,
			supportsScheduling: true,
		},
	},

	{
		...baseOffering,

		type: OFFERING_TYPES.BOOKING,
		lifecycle: bookingLifecycle,

		/**
		 * Default projection for now.
		 */
		projection: noopProjection,
		category: OFFERING_CATEGORIES.TIME_BASED,
		label: "Booking",
		description: "Reservable appointment or schedule.",

		configuration: {
			...baseOffering.configuration,
			supportsScheduling: true,
		},
	},

	{
		...baseOffering,

		type: OFFERING_TYPES.RENTAL,
		lifecycle: rentalLifecycle,

		/**
		 * Default projection for now.
		 */
		projection: noopProjection,
		category: OFFERING_CATEGORIES.PHYSICAL,
		label: "Rental",
		description: "Assets rented for a duration.",

		configuration: {
			...baseOffering.configuration,
			supportsInventory: true,
		},
	},

	{
		...baseOffering,

		type: OFFERING_TYPES.MEMBERSHIP,
		lifecycle: membershipLifecycle,

		/**
		 * Default projection for now.
		 */
		projection: noopProjection,
		category: OFFERING_CATEGORIES.ACCESS,
		label: "Membership",
		description: "Recurring member access.",

		/**
		 * Default configuration for now
		 */
	},

	{
		...baseOffering,

		type: OFFERING_TYPES.SUBSCRIPTION,
		lifecycle: subscriptionLifecycle,

		/**
		 * Default projection for now.
		 */
		projection: noopProjection,
		category: OFFERING_CATEGORIES.ACCESS,
		label: "Subscription",
		description: "Recurring subscription.",

		/**
		 * Default configuration for now
		 */
	},

	{
		...baseOffering,

		type: OFFERING_TYPES.COURSE,
		lifecycle: courseLifecycle,

		/**
		 * Default projection for now.
		 */
		projection: noopProjection,
		category: OFFERING_CATEGORIES.DIGITAL,
		label: "Course",
		description: "Educational offering.",

		/**
		 * Default configuration for now
		 */
	},

	{
		...baseOffering,

		type: OFFERING_TYPES.EVENT,
		lifecycle: eventLifecycle,

		/**
		 * Default projection for now.
		 */
		projection: noopProjection,
		category: OFFERING_CATEGORIES.EXPERIENCE,
		label: "Event",
		description: "Scheduled experience.",

		/**
		 * Default configuration for now
		 */
	},

	{
		...baseOffering,

		type: OFFERING_TYPES.PACKAGE,
		lifecycle: packageLifecycle,

		/**
		 * Default projection for now.
		 */
		projection: noopProjection,
		category: OFFERING_CATEGORIES.EXPERIENCE,
		label: "Package",
		description: "Bundle of offerings.",

		/**
		 * Default configuration for now
		 */
	},

	{
		...baseOffering,

		type: OFFERING_TYPES.DIGITAL_DOWNLOAD,
		lifecycle: digitalDownloadLifecycle,

		/**
		 * Default projection for now.
		 */
		projection: noopProjection,
		category: OFFERING_CATEGORIES.DIGITAL,
		label: "Digital Download",
		description: "Downloadable digital asset.",

		/**
		 * Default configuration for now
		 */
	},
];

export const offeringRegistry = createRegistry(
	offerings,
	(offering) => offering.type,
);

export default offeringRegistry;
```

```js
`~\server\src\modules\offering\routes\offering.routes.js`;

import { Router } from "express";

import { offeringController } from "../controllers/index.js";

import authenticate from "../../identity/middleware/authenticate.js";
import requirePermission from "../../identity/middleware/requirePermission.js";

import { Permissions } from "../../../shared/constants/index.js";

const router = Router({
	mergeParams: true,
});

router.use(authenticate);

router
	.route("/")
	.get(
		requirePermission(Permissions.OFFERING_VIEW),
		offeringController.listOfferings,
	)
	.post(
		requirePermission(Permissions.OFFERING_CREATE),
		offeringController.createOffering,
	);

router
	.route("/:offeringId")
	.get(
		requirePermission(Permissions.OFFERING_VIEW),
		offeringController.getOffering,
	)
	.patch(
		requirePermission(Permissions.OFFERING_UPDATE),
		offeringController.updateOffering,
	);

router.patch(
	"/:offeringId/archive",
	requirePermission(Permissions.OFFERING_ARCHIVE),
	offeringController.archiveOffering,
);

router.patch(
	"/:offeringId/restore",
	requirePermission(Permissions.OFFERING_RESTORE),
	offeringController.restoreOffering,
);

export default router;
```

```js
`~\server\src\modules\offering\controllers\offering.controller.js`;

import { success } from "../../../shared/utils/apiResponse.js";
import asyncHandler from "../../../shared/utils/asyncHandler.js";
import { validateRequest } from "../../../shared/validation/index.js";

import { offeringService } from "../services/index.js";

import {
	businessParamsSchema,
	createOfferingRequestSchema,
	listOfferingsQuerySchema,
	offeringParamsSchema,
	updateOfferingRequestSchema,
} from "../validators/index.js";

const createOffering = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessParamsSchema,
			body: createOfferingRequestSchema,
		},
		req,
	);

	const offering = await offeringService.createOffering({
		businessId: params.businessId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, offering, "Offering created successfully.");
});

const updateOffering = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: offeringParamsSchema,
			body: updateOfferingRequestSchema,
		},
		req,
	);

	const offering = await offeringService.updateOffering({
		businessId: params.businessId,
		offeringId: params.offeringId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, offering, "Offering updated successfully.");
});

const listOfferings = asyncHandler(async (req, res) => {
	const { params, query } = validateRequest(
		{
			params: businessParamsSchema,
			query: listOfferingsQuerySchema,
		},
		req,
	);

	const offerings = await offeringService.listOfferings({
		businessId: params.businessId,
		query,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, offerings, "Offerings retrieved successfully.");
});

const getOffering = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: offeringParamsSchema,
		},
		req,
	);

	const offering = await offeringService.getOffering({
		businessId: params.businessId,
		offeringId: params.offeringId,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, offering, "Offering retrieved successfully.");
});

const archiveOffering = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: offeringParamsSchema,
		},
		req,
	);

	const offering = await offeringService.archiveOffering({
		businessId: params.businessId,
		offeringId: params.offeringId,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, offering, "Offering archived successfully.");
});

const restoreOffering = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: offeringParamsSchema,
		},
		req,
	);

	const offering = await offeringService.restoreOffering({
		businessId: params.businessId,
		offeringId: params.offeringId,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, offering, "Offering restored successfully.");
});

export default {
	createOffering,
	listOfferings,
	getOffering,
	updateOffering,
	archiveOffering,
	restoreOffering,
};
```

```js
`~\server\src\modules\offering\services\offering.service.js`;

import lifecycleFactory from "../lifecycles/lifecycle.factory.js";
import { offeringRepository } from "../repositories/index.js";
import { offeringRegistry } from "../../../shared/platform/offerings/index.js";

/**
 * Delegation layer
 */

/**
|--------------------------------------------------
| Private helper functions
|--------------------------------------------------
*/

function registrationFor(type) {
	const registration = offeringRegistry.get(type);

	if (!registration) {
		return {
			lifecycle: lifecycleFactory.resolveLifecycle("UNKNOWN"),
		};
	}

	return registration;
}

async function resolveExistingRegistration({ businessId, offeringId }) {
	const offering = await offeringRepository.findByBusinessAndId(
		businessId,
		offeringId,
	);

	if (!offering) {
		return {
			lifecycle: lifecycleFactory.resolveLifecycle("UNKNOWN"),
		};
	}

	return registrationFor(offering.type);
}

/**
|--------------------------------------------------
| Public functions
|--------------------------------------------------
*/

/**
 * The fallback to "PRODUCT" is only a transitional mechanism. For get, update, archive, and restore, the service does not yet know the offering type because it only receives an offeringId. In the next refinement, the resolver should determine the lifecycle by first loading the offering from the repository:
 */

async function createOffering(payload) {
	const registration = registrationFor(payload.data.type);

	return registration.lifecycle.create({
		...payload,
		registration,
	});
}

async function updateOffering(payload) {
	const registration = await resolveExistingRegistration(payload);

	return registration.lifecycle.update({
		...payload,
		registration,
	});
}

async function listOfferings(payload) {
	/**
	 * For now you can also do.
	 *
	 * Although list() doesn't use it yet.
	 */
	const registration = registrationFor(payload.query?.type ?? "PRODUCT");

	return registration.lifecycle.list({
		...payload,
		registration,
	});
}

async function getOffering(payload) {
	const registration = await resolveExistingRegistration(payload);

	return registration.lifecycle.get({
		...payload,
		registration,
	});
}

async function archiveOffering(payload) {
	const registration = await resolveExistingRegistration(payload);

	return registration.lifecycle.archive({
		...payload,
		registration,
	});
}

async function restoreOffering(payload) {
	const registration = await resolveExistingRegistration(payload);

	return registration.lifecycle.restore({
		...payload,
		registration,
	});
}

export default {
	createOffering,
	listOfferings,
	getOffering,
	updateOffering,
	archiveOffering,
	restoreOffering,
};
```

```js
`~\server\src\modules\offering\repositories\offering.repository.js`;

import { Offering } from "../models/index.js";

/**
 * To keep the Offering domain consistent with the rest of the architecture, I would also avoid returning raw Mongoose documents from repository methods long-term. As the project grows, you'll likely want repository methods to consistently apply common population profiles (similar to the populateProfiles approach you've introduced elsewhere). That will make the Offering module easier to extend when Offerings begin referencing Categories, Variants, Assets, Pricing, Inventory, and future subdomains
 */

async function create(data) {
	return Offering.create(data);
}

async function save(offering) {
	return offering.save();
}

async function findById(id) {
	return Offering.findById(id);
}

async function findByBusinessAndId(businessId, offeringId) {
	return Offering.findOne({
		_id: offeringId,
		business: businessId,
	});
}

async function findByBusinessAndName(businessId, name, excludeId = null) {
	const query = {
		business: businessId,
		name,
	};

	if (excludeId) {
		query._id = { $ne: excludeId };
	}

	return Offering.findOne(query);
}

async function findByBusinessAndSlug(businessId, slug, excludeId = null) {
	const query = {
		business: businessId,
		slug,
	};

	if (excludeId) {
		query._id = { $ne: excludeId };
	}

	return Offering.findOne(query);
}

async function existsByBusinessAndSlug(businessId, slug, excludeId = null) {
	const existing = await findByBusinessAndSlug(businessId, slug, excludeId);

	return Boolean(existing);
}

async function findByBusiness(
	businessId,
	{ type, status, visibility, search, skip = 0, limit = 20 } = {},
) {
	const filter = {
		business: businessId,
	};

	if (type) {
		filter.type = type;
	}

	if (status) {
		filter.status = status;
	}

	if (visibility) {
		filter.visibility = visibility;
	}

	if (search) {
		filter.$or = [
			{
				name: {
					$regex: search,
					$options: "i",
				},
			},
			{
				description: {
					$regex: search,
					$options: "i",
				},
			},
		];
	}

	const [data, total] = await Promise.all([
		Offering.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),

		Offering.countDocuments(filter),
	]);

	return {
		data,
		total,
	};
}

export default {
	create,
	save,

	findById,

	findByBusinessAndId,
	findByBusinessAndName,
	findByBusinessAndSlug,

	existsByBusinessAndSlug,

	findByBusiness,
};
```

```js
`~\server\src\modules\offering\models\offering.model.js`;

import mongoose from "mongoose";

import { OFFERING_STATUS, OFFERING_VISIBILITY } from "../constants/index.js";

import { OFFERING_TYPES } from "../../../shared/platform/offerings/index.js";

const offeringSchema = new mongoose.Schema(
	{
		business: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Business",
			required: true,
			index: true,
		},

		type: {
			type: String,
			required: true,
			enum: Object.values(OFFERING_TYPES),
			index: true,
		},

		slug: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			index: true,
		},

		name: {
			type: String,
			required: true,
			trim: true,
		},

		shortDescription: {
			type: String,
			trim: true,
			default: "",
		},

		description: {
			type: String,
			default: "",
		},

		status: {
			type: String,
			enum: Object.values(OFFERING_STATUS),
			default: OFFERING_STATUS.DRAFT,
			index: true,
		},

		visibility: {
			type: String,
			enum: Object.values(OFFERING_VISIBILITY),
			default: OFFERING_VISIBILITY.PRIVATE,
		},

		searchable: {
			type: Boolean,
			default: true,
		},

		featured: {
			type: Boolean,
			default: false,
		},

		publishedAt: Date,

		metadata: {
			type: mongoose.Schema.Types.Mixed,
			default: {},
		},

		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},

		updatedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		timestamps: true,
	},
);

offeringSchema.index({
	business: 1,
	slug: 1,
});

export const Offering =
	mongoose.models.Offering || mongoose.model("Offering", offeringSchema);
```

```js
`~\server\src\modules\offering\presenters\offering.presenter.js`;

import { getId } from "../../../shared/utils/presenter.js";

class OfferingPresenter {
	present(offering) {
		if (!offering) return null;

		const businessId = getId(offering.business);

		return {
			id: offering.id,

			businessId,

			type: offering.type,

			slug: offering.slug,

			name: offering.name,

			shortDescription: offering.shortDescription,

			description: offering.description,

			status: offering.status,

			visibility: offering.visibility,

			searchable: offering.searchable,

			featured: offering.featured,

			publishedAt: offering.publishedAt,

			metadata: offering.metadata,

			createdAt: offering.createdAt,

			updatedAt: offering.updatedAt,
		};
	}

	presentCollection(offerings) {
		return offerings.map((offering) => this.present(offering));
	}
}

export default new OfferingPresenter();
```

```js
`~\server\src\modules\offering\lifecycles\shared\offering.lifecycle.js`;

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
| Lifecycle Hooks
|--------------------------------------------------------------------------
|
| Specialized lifecycles (Product, Rental, Booking, etc.) override these
| hooks to inject domain-specific behavior without duplicating the shared
| lifecycle implementation.
|
*/

const defaultHooks = {
	async beforeCreate() {},

	async afterCreate() {},

	async beforeUpdate() {},

	async afterUpdate() {},

	async beforeArchive() {},

	async afterArchive() {},

	async beforeRestore() {},

	async afterRestore() {},
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
	};

	await hooks.beforeCreate(context);

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
	};

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

	Object.assign(offering, data);

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
		offering,
		actor,
		requestMetadata,
		registration,
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
		offering,
		actor,
		requestMetadata,
		registration,
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
```

```js
`~\server\src\modules\offering\lifecycles\product.lifecycle.js`;

import sharedLifecycle from "./shared/offering.lifecycle.js";
import productRepository from "../../commerce/repositories/product.repository.js";
import { HTTP_STATUS } from "../../../shared/constants/index.js";
import { AppError, ErrorCodes } from "../../../shared/errors/index.js";

/**
|--------------------------------------------------
| Private helper
|--------------------------------------------------
*/

function getProjection(context) {
	return context.registration.projection;
}

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

async function loadProjection(context) {
	if (context.product) {
		return context.product;
	}

	context.product = await getProjection(context).find(context.offering.id);

	return context.product;
}

const hooks = {
	...sharedLifecycle.hooks,

	async beforeCreate(context) {
		context.data.sku = normalizeSku(context.data.sku);

		await ensureSkuIsUnique(context.businessId, context.data.sku);
	},

	async afterCreate(context) {
		context.product = await getProjection(context).create(context);
	},

	async beforeUpdate(context) {
		await loadProjection(context);

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
		await getProjection(context).update(context);
	},

	async beforeArchive(context) {
		await loadProjection(context);
	},

	async afterArchive(context) {
		await getProjection(context).archive(context);
	},

	async beforeRestore(context) {
		await loadProjection(context);
	},

	async afterRestore(context) {
		await getProjection(context).restore(context);
	},
};

export default {
	...sharedLifecycle,

	hooks,

	create(payload) {
		return sharedLifecycle.create({
			...payload,
			registration: {
				lifecycle: { hooks },
				...payload.registration,
			},
		});
	},

	update(payload) {
		return sharedLifecycle.update({
			...payload,
			registration: {
				lifecycle: { hooks },
				...payload.registration,
			},
		});
	},

	/**
	 * I am not sure whether i am to make list and get API's to have a similar implementation as create, update, archive and restore. I will leave it for now and come back to it later if needed.
	 */
	list: sharedLifecycle.list,
	get: sharedLifecycle.get,

	archive(payload) {
		return sharedLifecycle.archive({
			...payload,
			registration: {
				lifecycle: { hooks },
				...payload.registration,
			},
		});
	},

	restore(payload) {
		return sharedLifecycle.restore({
			...payload,
			registration: {
				lifecycle: { hooks },
				...payload.registration,
			},
		});
	},
};
```

```js
`~\server\src\modules\offering\lifecycles\service.lifecycle.js`;

import sharedLifecycle from "./shared/offering.lifecycle.js";

export default {
	create: sharedLifecycle.create,
	list: sharedLifecycle.list,
	get: sharedLifecycle.get,
	update: sharedLifecycle.update,
	archive: sharedLifecycle.archive,
	restore: sharedLifecycle.restore,
};
```

```js
`~\server\src\modules\offering\lifecycles\rental.lifecycle.js`;

import sharedLifecycle from "./shared/offering.lifecycle.js";

export default {
	create: sharedLifecycle.create,
	list: sharedLifecycle.list,
	get: sharedLifecycle.get,
	update: sharedLifecycle.update,
	archive: sharedLifecycle.archive,
	restore: sharedLifecycle.restore,
};
```

```js
`~\server\src\modules\offering\builders\offering.builder.js`;

import offeringRegistry from "../../../shared/platform/offerings/offering.registry.js";

export function buildOffering({ businessId, data, slug, actor }) {
	const definition = offeringRegistry.get(data.type);

	if (!definition) {
		throw new Error(`Unknown offering type "${data.type}".`);
	}

	const defaults = definition.defaults;

	return {
		business: businessId,

		type: definition.type,

		slug,

		name: data.name.trim(),

		shortDescription: data.shortDescription ?? "",

		description: data.description ?? "",

		status: data.status ?? defaults.status,

		visibility: data.visibility ?? defaults.visibility,

		searchable: data.searchable ?? defaults.searchable,

		featured: data.featured ?? defaults.featured,

		metadata: {
			...defaults.metadata,
			...(data.metadata ?? {}),
		},

		createdBy: actor.id,

		updatedBy: actor.id,
	};
}
```

```js
`~\server\src\modules\offering\builders\offering.factory.js`;

import { HTTP_STATUS } from "../../../shared/constants/index.js";
import { AppError, ErrorCodes } from "../../../shared/errors/index.js";
import offeringRegistry from "../../../shared/platform/offerings/offering.registry.js";

/**
 * Its sole responsibility is to resolve the correct builder for an offering type and delegate construction.
 */

function resolveBuilder(type) {
	const definition = offeringRegistry.get(type);

	// if (!definition) {
	// 	throw new Error(`Unknown offering type "${type}".`);
	// }

	if (!definition) {
		throw new AppError(
			`Unknown offering type "${type}".`,
			HTTP_STATUS.NOT_FOUND,
			ErrorCodes.NOT_FOUND,
		);
	}

	return definition.builder;
}

function createOffering(payload) {
	return resolveBuilder(payload.data.type)(payload);
}

export default {
	createOffering,
};
```

```js
`~\server\src\modules\offering\projections\noop.projection.js`;

import projectionContract from "./projection.contract.js";

export default {
	...projectionContract,
};
```

```js
`~\src\modules\offering\projections\projection.contract.js`;

const projectionContract = {
	async find() {
		return null;
	},

	async create() {},

	async update() {},

	async archive() {},

	async restore() {},
};

export default projectionContract;
```

```js
`~\server\src\modules\commerce\controllers\product.controller.js`;

import { success } from "../../../shared/utils/apiResponse.js";
import asyncHandler from "../../../shared/utils/asyncHandler.js";
import validateRequest from "../../../shared/validation/validateRequest.js";

import productService from "../services/product.service.js";

import {
	listProductsQuerySchema,
	productParamsSchema,
} from "../validators/product.validator.js";

const list = asyncHandler(async (req, res) => {
	const { query } = validateRequest(
		{
			query: listProductsQuerySchema,
		},
		req,
	);

	const products = await productService.list({
		businessId: req.params.businessId,
		query,
	});

	return success(res, products, "Products retrieved successfully.");
});

const getById = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: productParamsSchema,
		},
		req,
	);

	const product = await productService.getById({
		businessId: params.businessId,
		productId: params.productId,
	});

	return success(res, product, "Product retrieved successfully.");
});

export default {
	list,
	getById,
};
```

```js
`~\server\src\modules\commerce\services\product.service.js`;

import productRepository from "../repositories/product.repository.js";
import productPresenter from "../presenters/product.presenter.js";

import businessRepository from "../../business/repositories/business.repository.js";

import { HTTP_STATUS } from "../../../shared/constants/index.js";
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
```

```js
`~\server\src\modules\commerce\repositories\product.repository.js`;

import Product from "../models/Product.js";

/*
|--------------------------------------------------------------------------
| Shared Populate
|--------------------------------------------------------------------------
*/

const OFFERING_POPULATE = {
	path: "offering",
};

/*
|--------------------------------------------------------------------------
| CRUD
|--------------------------------------------------------------------------
*/

const create = async (payload) => {
	return Product.create(payload);
};

const findById = async (id) => {
	return Product.findById(id).populate(OFFERING_POPULATE);
};

const findByBusinessAndId = async (businessId, productId) => {
	return Product.findOne({
		_id: productId,
		business: businessId,
	}).populate(OFFERING_POPULATE);
};

const findByOffering = async (offeringId) => {
	return Product.findOne({
		offering: offeringId,
	}).populate(OFFERING_POPULATE);
};

const findByOfferingAndBusiness = async (businessId, offeringId) => {
	return Product.findOne({
		business: businessId,
		offering: offeringId,
	}).populate(OFFERING_POPULATE);
};

const findByBusinessAndSku = async (businessId, sku, excludeId = null) => {
	if (!sku) {
		return null;
	}

	const query = {
		business: businessId,
		sku,
	};

	if (excludeId) {
		query._id = { $ne: excludeId };
	}

	return Product.findOne(query).populate(OFFERING_POPULATE);
};

const findByBusiness = async (
	businessId,
	{ page = 1, limit = 20, sort = { createdAt: -1 } } = {},
) => {
	const query = {
		business: businessId,
	};

	const skip = (page - 1) * limit;

	const [products, total] = await Promise.all([
		Product.find(query)
			.populate(OFFERING_POPULATE)
			.sort(sort)
			.skip(skip)
			.limit(limit),

		Product.countDocuments(query),
	]);

	return {
		products,
		total,
		page,
		limit,
		totalPages: Math.ceil(total / limit),
	};
};

const save = async (product) => {
	return product.save();
};

export default {
	create,

	findById,
	findByBusinessAndId,

	findByOffering,
	findByOfferingAndBusiness,

	findByBusinessAndSku,
	findByBusiness,

	save,
};
```

```js
`~\server\src\modules\commerce\presenters\product.presenter.js`;

/**
 * Do not remove the commented block till further notice.
 */
// /**
//  * Converts a single Product document into a JSON-friendly object by:
//  * - Converting MongoDB ObjectIds to strings.
//  * - Hiding internal Mongoose properties (__v, document methods, etc.).
//  * - Returning a consistent response shape.
//  * - Returning null when no product is provided.
//  */
// const present = (product) => {
// 	if (!product) {
// 		return null;
// 	}

// 	return {
// 		id: product._id.toString(),

// 		businessId: product.business?.toString(),

// 		name: product.name,
// 		slug: product.slug,

// 		shortDescription: product.shortDescription,
// 		description: product.description,

// 		sku: product.sku,

// 		categoryId: product.category?.toString() ?? null,

// 		status: product.status,

// 		createdBy: product.createdBy?.toString(),
// 		updatedBy: product.updatedBy?.toString(),

// 		createdAt: product.createdAt,
// 		updatedAt: product.updatedAt,
// 	};
// };

// const presentCollection = (result) => {
// 	return {
// 		data: result.products.map(present),

// 		pagination: {
// 			total: result.total,
// 			page: result.page,
// 			limit: result.limit,
// 			totalPages: result.totalPages,
// 		},
// 	};
// };

// export default {
// 	present,
// 	presentCollection,
// };

// // ...

import { getId } from "../../../shared/utils/presenter.js";

/**
 * Converts a single Product document into a JSON-friendly object by:
 * - Converting MongoDB ObjectIds to strings.
 * - Hiding internal Mongoose properties (__v, document methods, etc.).
 * - Returning a consistent response shape.
 * - Returning null when no product is provided.
 *
 * Combines the Product projection with its Offering aggregate into a single
 * API response.
 */
const present = (product) => {
	if (!product) return null;

	const businessId = getId(product.business);

	const offering = product.offering;

	return {
		id: product._id.toString(),

		businessId,

		offeringId: offering?._id?.toString(),

		/**
		 * Offering fields
		 */
		type: offering?.type,

		name: offering?.name,

		slug: offering?.slug,

		shortDescription: offering?.shortDescription,

		description: offering?.description,

		status: offering?.status,

		visibility: offering?.visibility,

		searchable: offering?.searchable,

		featured: offering?.featured,

		metadata: offering?.metadata ?? {},

		/**
		 * Product fields
		 */
		sku: product.sku,

		categoryId: product.category?.toString() ?? null,

		createdBy: product.createdBy?.toString(),

		updatedBy: product.updatedBy?.toString(),

		createdAt: product.createdAt,

		updatedAt: product.updatedAt,
	};
};

const presentCollection = (result) => {
	return {
		data: result.products.map(present),

		pagination: {
			total: result.total,
			page: result.page,
			limit: result.limit,
			totalPages: result.totalPages,
		},
	};
};

export default {
	present,
	presentCollection,
};
```

```js
`~\server\src\modules\commerce\models\Product.js`;

// import mongoose from "mongoose";
// import {
// 	PRODUCT_STATUS,
// 	PRODUCT_STATUS_VALUES,
// } from "../../../shared/constants/index.js";

// /**
//  * This model intentionally does not include:
//  * - Product image
//  * - Gallery
//  * - Product variants
//  * - Inventory
//  * - Pricing history
//  * - Branch stock
//  * - Discounts
//  * - Taxes
//  */
// const productSchema = new mongoose.Schema(
// 	{
// 		business: {
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: "Business",
// 			required: true,
// 			index: true,
// 		},

// 		offering: {
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: "Offering",
// 			required: true,
// 			unique: true,
// 			index: true,
// 		},

// 		slug: {
// 			type: String,
// 			required: true,
// 			trim: true,
// 		},

// 		name: {
// 			type: String,
// 			required: true,
// 			trim: true,
// 			maxlength: 150,
// 		},

// 		shortDescription: {
// 			type: String,
// 			trim: true,
// 			maxlength: 300,
// 			default: "",
// 		},

// 		description: {
// 			type: String,
// 			trim: true,
// 			default: "",
// 		},

// 		sku: {
// 			type: String,
// 			trim: true,
// 		},

// 		category: {
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: "ProductCategory",
// 			default: null,
// 		},

// 		status: {
// 			type: String,
// 			enum: PRODUCT_STATUS_VALUES,
// 			default: PRODUCT_STATUS.ACTIVE,
// 			index: true,
// 		},

// 		createdBy: {
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: "User",
// 			required: true,
// 		},

// 		updatedBy: {
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: "User",
// 			required: true,
// 		},
// 	},
// 	{
// 		timestamps: true,
// 	},
// );

// /**
//  * Unique product name within a business
//  */
// productSchema.index(
// 	{ business: 1, name: 1 },
// 	{
// 		unique: true,
// 	},
// );

// /**
//  * Unique slug within a business
//  */
// productSchema.index(
// 	{ business: 1, slug: 1 },
// 	{
// 		unique: true,
// 	},
// );

// /**
//  * Unique SKU within a business (when provided)
//  */
// productSchema.index(
// 	{ business: 1, sku: 1 },
// 	{
// 		unique: true,
// 		sparse: true,
// 	},
// );

// export default mongoose.model("Product", productSchema);

import mongoose from "mongoose";

/**
 * Product Projection
 *
 * Stores only Product-specific information.
 *
 * Shared information such as:
 * - name
 * - slug
 * - description
 * - status
 * - visibility
 * - searchable
 * - metadata
 *
 * now lives in the Offering aggregate.
 */
const productSchema = new mongoose.Schema(
	{
		business: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Business",
			required: true,
			index: true,
		},

		offering: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Offering",
			required: true,
			unique: true,
			index: true,
		},

		/**
		 * Product-specific identity
		 */
		sku: {
			type: String,
			trim: true,
		},

		/**
		 * Product classification
		 */
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "ProductCategory",
			default: null,
		},

		/**
		 * Future Product-only fields
		 *
		 * Examples:
		 *
		 * physical:
		 *  - weight
		 *  - dimensions
		 *  - barcode
		 *  - manufacturer
		 *  - brand
		 *
		 * shipping:
		 *  - requiresShipping
		 *  - shippingClass
		 *
		 * inventory:
		 *  - inventoryStrategy
		 *  - stockBehaviour
		 *
		 * compliance:
		 *  - serialised
		 *  - warranty
		 */

		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		updatedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

/**
 * SKU must remain unique within a business.
 */
productSchema.index(
	{ business: 1, sku: 1 },
	{
		unique: true,
		sparse: true,
	},
);

export default mongoose.model("Product", productSchema);
```

```js
`~\server\src\modules\commerce\adapters\product.projection.js`;

import productRepository from "../repositories/product.repository.js";
import { projectionContract } from "../../offering/projections/index.js";

/**
 * This also makes future extensions (variants, dimensions, shipping, inventory policies, manufacturer, barcode, etc.) straightforward without duplicating any Offering state.
 */

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function mapOfferingToProduct(offering, actor) {
	return {
		business: offering.business,

		offering: offering.id,

		createdBy: actor.id,

		updatedBy: actor.id,
	};
}

/*
|--------------------------------------------------------------------------
| Projection
|--------------------------------------------------------------------------
*/

async function create(context) {
	const { offering, actor, data } = context;

	return productRepository.create({
		...mapOfferingToProduct(offering, actor),

		sku: data.sku ?? null,

		category: data.categoryId ?? null,
	});
}

async function find(offeringId) {
	return productRepository.findByOffering(offeringId);
}

async function update(context) {
	const { product, actor, data } = context;

	if (!product) {
		return null;
	}

	if (data.sku !== undefined) {
		product.sku = data.sku;
	}

	if (data.categoryId !== undefined) {
		product.category = data.categoryId;
	}

	product.updatedBy = actor.id;

	return productRepository.save(product);
}

/**
 * Nothing Product-specific currently changes when an Offering
 * is archived. The projection exists only to satisfy the lifecycle
 * contract and to provide future extension points.
 */
async function archive() {
	return null;
}

/**
 * Nothing Product-specific currently changes when an Offering
 * is restored.
 */
async function restore() {
	return null;
}

export default {
	...projectionContract,

	find,

	create,

	update,

	archive,

	restore,
};
```
