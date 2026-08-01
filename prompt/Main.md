Here is the breakdown and current standing of a portion of the application. What are we to work on next show me the plan, i want to know the subsequent steps to come.

## Breakdown of What We have been Working on lately

1. Milestone 1 — Platform Registry Foundation (covered)
    - Capability Registry
    - Module Registry
    - Business Type Registry
2. Milestone 2 — Business Configuration Model (covered)
3. Milestone 3 — Configuration Service (covered)
    - Step 1 — Integrate Business Creation
    - Step 2 — Business Retrieval
    - Step 3 — Startup Validation
    - Step 4 — Domain Events (Preparation)
4. Milestone 4 — Business Provisioning (covered)
5. Milestone 5 — Navigation Generation (covered)
    - 5.1 Navigation Registry
    - 5.2 Navigation Builder
    - 5.3 Navigation Service
    - 5.4 Navigation API
    - 5.5 Dashboard Registry
    - 5.6 Dashboard Builder
    - 5.7 Frontend Dynamic Rendering
6. Milestone 6 — Configuration Management

---

### Offering Framework

1. Milestone 1 — Offering Domain Foundation (covered)
2. Milestone 2 — Offering Contract (covered)
3. Milestone 3 — Offering Registry (covered)
4. Milestone 4 — Offering Service Layer (covered)
5. Milestone 5 — Product Adapter
6. Milestone 6 — Variant Implementation

---

1. Architecture Review (covered)
2. Create the offering domain skeleton (folders, exports, constants) (covered)
3. Define the Offering contract and base model (covered)
4. Implement the Offering Registry and integrate it with the (registry bootstrapping, validation utilities, and registry lookups) (covered)
5. Build repositories, presenters, and services for generic offering lifecycle operations (covered)
6. Migrate the existing Product implementation to conform to the Offering contract
7. Resume Product Variants on top of the new abstraction
8. Proceed to Marketplace aggregation, which will consume Offerings rather than Products.

---

1. Move the current shared lifecycle to lifecycles/shared/offering.lifecycle.js (no logic changes). (covered)
2. Create specialized lifecycle files (product.lifecycle.js, rental.lifecycle.js, booking.lifecycle.js, etc.) that simply spread the shared lifecycle. (covered)
3. Implement lifecycle.factory.js to resolve the appropriate lifecycle based on offering type. (covered)
4. Refactor offering.service.js so it delegates to the lifecycle factory instead of importing the shared lifecycle directly. (covered)
5. Run the existing Offering API test suite unchanged to confirm behavior is identical before adding any type-specific business logic. (covered)

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

	return success(res, offerings);
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

	return success(res, offering);
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

/**
 * Delegation layer
 */

/**
|--------------------------------------------------
| Private helper functions
|--------------------------------------------------
*/

function lifecycleFor(payload) {
	return lifecycleFactory.resolveLifecycle(payload.data.type);
}

async function resolveExistingLifecycle({ businessId, offeringId }) {
	const offering = await offeringRepository.findByBusinessAndId(
		businessId,
		offeringId,
	);

	if (!offering) {
		return lifecycleFactory.resolveLifecycle("UNKNOWN");
	}

	return lifecycleFactory.resolveLifecycle(offering.type);
}

/**
|--------------------------------------------------
| Public functions
|--------------------------------------------------
*/

/**
 * The fallback to "PRODUCT" is only a transitional mechanism. For get, update, archive, and restore, the service does not yet know the offering type because it only receives an offeringId. In the next refinement, the resolver should determine the lifecycle by first loading the offering from the repository:
 */

// async function createOffering(payload) {
// 	const lifecycle = lifecycleRegistry.resolveLifecycle(payload.data.type);

// 	return lifecycle.create(payload);
// }

async function createOffering(payload) {
	return lifecycleFor(payload).create(payload);
}

// async function listOfferings(payload) {
// 	const lifecycle = lifecycleRegistry.resolveLifecycle(
// 		payload.query?.type ?? payload.type ?? "PRODUCT",
// 	);

// 	return lifecycle.list(payload);
// }

async function listOfferings(payload) {
	// shared for now
	return lifecycleFactory
		.resolveLifecycle(payload.query?.type ?? "PRODUCT")
		.list(payload);
}

// async function getOffering(payload) {
// 	// Placeholder until entity-based resolution is introduced.
// 	const lifecycle = lifecycleRegistry.resolveLifecycle(
// 		payload.type ?? "PRODUCT",
// 	);

// 	return lifecycle.get(payload);
// }

async function getOffering(payload) {
	const lifecycle = await resolveExistingLifecycle(payload);

	return lifecycle.get(payload);
}

// async function updateOffering(payload) {
// 	const lifecycle = lifecycleRegistry.resolveLifecycle(
// 		payload.data?.type ?? payload.type ?? "PRODUCT",
// 	);

// 	return lifecycle.update(payload);
// }

async function updateOffering(payload) {
	const lifecycle = await resolveExistingLifecycle(payload);

	return lifecycle.update(payload);
}

// async function archiveOffering(payload) {
// 	const lifecycle = lifecycleRegistry.resolveLifecycle(
// 		payload.type ?? "PRODUCT",
// 	);

// 	return lifecycle.archive(payload);
// }

async function archiveOffering(payload) {
	const lifecycle = await resolveExistingLifecycle(payload);

	return lifecycle.archive(payload);
}

// async function restoreOffering(payload) {
// 	const lifecycle = lifecycleRegistry.resolveLifecycle(
// 		payload.type ?? "PRODUCT",
// 	);

// 	return lifecycle.restore(payload);
// }

async function restoreOffering(payload) {
	const lifecycle = await resolveExistingLifecycle(payload);

	return lifecycle.restore(payload);
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
`~\server\src\modules\offering\builders\offering.factory.js`;

import offeringRegistry from "../../../shared/platform/offerings/offering.registry.js";

/**
 * Its sole responsibility is to resolve the correct builder for an offering type and delegate construction.
 */

function resolveBuilder(type) {
	const definition = offeringRegistry.get(type);

	if (!definition) {
		throw new Error(`Unknown offering type "${type}".`);
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

/**
 * For now, every type will use the generic OfferingBuilder. As Product, Booking, Rental, Course, etc. evolve, you simply replace the mapping—without touching the service.
 */
const baseOffering = {
	builder: buildOffering,

	lifecycle: null,

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
		category: OFFERING_CATEGORIES.ACCESS,
		label: "Membership",
		description: "Recurring member access.",

		// Default configuration for now
	},

	{
		...baseOffering,

		type: OFFERING_TYPES.SUBSCRIPTION,
		lifecycle: subscriptionLifecycle,
		category: OFFERING_CATEGORIES.ACCESS,
		label: "Subscription",
		description: "Recurring subscription.",

		// Default configuration for now
	},

	{
		...baseOffering,

		type: OFFERING_TYPES.COURSE,
		lifecycle: courseLifecycle,
		category: OFFERING_CATEGORIES.DIGITAL,
		label: "Course",
		description: "Educational offering.",

		// Default configuration for now
	},

	{
		...baseOffering,

		type: OFFERING_TYPES.EVENT,
		lifecycle: eventLifecycle,
		category: OFFERING_CATEGORIES.EXPERIENCE,
		label: "Event",
		description: "Scheduled experience.",

		// Default configuration for now
	},

	{
		...baseOffering,

		type: OFFERING_TYPES.PACKAGE,
		lifecycle: packageLifecycle,
		category: OFFERING_CATEGORIES.EXPERIENCE,
		label: "Package",
		description: "Bundle of offerings.",

		// Default configuration for now
	},

	{
		...baseOffering,

		type: OFFERING_TYPES.DIGITAL_DOWNLOAD,
		lifecycle: digitalDownloadLifecycle,
		category: OFFERING_CATEGORIES.DIGITAL,
		label: "Digital Download",
		description: "Downloadable digital asset.",

		// Default configuration for now
	},
];

export const offeringRegistry = createRegistry(
	offerings,
	(offering) => offering.type,
);

export default offeringRegistry;
```

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
`~\server\src\modules\offering\lifecycles\product.lifecycle.js`;

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
