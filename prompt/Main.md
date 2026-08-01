Let's continue. The next milestone was to evolving the Offering Domain into the platform abstraction described in the architecture specification by introducing the builder/factory pattern and registry-driven defaults and behavior.

## The implementation steps you recommended

1. Phase 1 — Offering Type Registry Integration
2. Phase 2 — Offering Builder
    ```bash
    offering/
    builders/
        offering.builder.js
    ```
3. Phase 3 — Offering Factory
4. Phase 4 — Registry-driven
    - defaults
    - validation
5. Phase 5 — Shared Offering Lifecycle
    -   - preparation for Product/Booking/Rental inheritance.

For your information to avoid inconsistencies, here is the current state(s) of a portion of the folder structure and files we recently created or optimized:

# TassiaQCA Folder Structure

Generated on: 2026-07-31

```bash
├── client/
│   └── ...
├── server/
│   ├── src/
│   │   ├── app/
│   │   │   ├── bootstrap/
│   │   │   │   └── database.js
│   │   │   ├── config/
│   │   │   │   ├── cloudinary.js
│   │   │   │   ├── cors.js
│   │   │   │   └── env.js
│   │   │   ├── middleware/
│   │   │   ├── routes/
│   │   │   │   └── api.js
│   │   │   ├── app.js
│   │   │   └── server.js
│   │   ├── modules/
│   │   │   ├── offering/
│   │   │   │   ├── builders/
│   │   │   │   │   └── index.js
│   │   │   │   ├── constants/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── offeringStatus.constants.js
│   │   │   │   │   └── offeringVisibility.constants.js
│   │   │   │   ├── controllers/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── offering.controller.js
│   │   │   │   ├── errors/
│   │   │   │   │   └── index.js
│   │   │   │   ├── models/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── offering.model.js
│   │   │   │   ├── presenters/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── offering.presenter.js
│   │   │   │   ├── registries/
│   │   │   │   │   └── index.js
│   │   │   │   ├── repositories/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── offering.repository.js
│   │   │   │   ├── routes/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── offering.routes.js
│   │   │   │   ├── services/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── offering.service.js
│   │   │   │   ├── validators/
│   │   │   │   │   ├── businessParamsSchema.js
│   │   │   │   │   ├── createOfferingSchema.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── listOfferingsQuerySchema.js
│   │   │   │   │   ├── offeringParamsSchema.js
│   │   │   │   │   └── updateOfferingSchema.js
│   │   │   │   └── index.js
│   │   │   └── ...
│   │   ├── scripts/
│   │   │   ├── seed-permissions.js
│   │   │   └── seed-roles.js
│   │   └── shared/
│   │       ├── constants/
│   │       │   ├── auditActions.js
│   │       │   ├── auditEntityTypes.js
│   │       │   ├── permissions.js
│   │       │   └── ...
│   │       ├── platform/
│   │       │   ├── offerings/
│   │       │   │   ├── index.js
│   │       │   │   ├── offering.constants.js
│   │       │   │   ├── offering.registry.js
│   │       │   │   └── offeringCategory.constants.js
│   │       │   ├── registry/
│   │       │   │   ├── index.js
│   │       │   │   ├── registry.bootstrap.js
│   │       │   │   ├── registry.js
│   │       │   │   ├── registry.utils.js
│   │       │   │   └── registry.validator.js
│   │       │   └── ...
│   │       └── ...
│   └── ...
└── ...
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

const baseOffering = {
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
};

const offerings = [
	{
		...baseOffering,

		type: OFFERING_TYPES.PRODUCT,
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
		category: OFFERING_CATEGORIES.ACCESS,
		label: "Membership",
		description: "Recurring member access.",

		// Default configuration for now
	},

	{
		...baseOffering,

		type: OFFERING_TYPES.SUBSCRIPTION,
		category: OFFERING_CATEGORIES.ACCESS,
		label: "Subscription",
		description: "Recurring subscription.",

		// Default configuration for now
	},

	{
		...baseOffering,

		type: OFFERING_TYPES.COURSE,
		category: OFFERING_CATEGORIES.DIGITAL,
		label: "Course",
		description: "Educational offering.",

		// Default configuration for now
	},

	{
		...baseOffering,

		type: OFFERING_TYPES.EVENT,
		category: OFFERING_CATEGORIES.EXPERIENCE,
		label: "Event",
		description: "Scheduled experience.",

		// Default configuration for now
	},

	{
		...baseOffering,

		type: OFFERING_TYPES.PACKAGE,
		category: OFFERING_CATEGORIES.EXPERIENCE,
		label: "Package",
		description: "Bundle of offerings.",

		// Default configuration for now
	},

	{
		...baseOffering,

		type: OFFERING_TYPES.DIGITAL_DOWNLOAD,
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

import { offeringRepository } from "../repositories/index.js";
import { offeringPresenter } from "../presenters/index.js";

import businessRepository from "../../business/repositories/business.repository.js";
import { auditLogService } from "../../audit/index.js";

import slugify from "../../../shared/utils/slugify.js";

import {
	AUDIT_ACTIONS,
	AUDIT_ENTITY_TYPES,
	HTTP_STATUS,
} from "../../../shared/constants/index.js";

import { OFFERING_STATUS } from "../constants/index.js";

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
| Public Service
|--------------------------------------------------------------------------
*/

async function createOffering({ businessId, data, actor, requestMetadata }) {
	await ensureBusinessExists(businessId);

	const name = data.name.trim();

	await ensureOfferingNameIsUnique(businessId, name);

	const slug = await generateUniqueSlug(businessId, name);

	const offering = await offeringRepository.create({
		...data,

		business: businessId,

		name,

		slug,

		createdBy: actor.id,
		updatedBy: actor.id,
	});

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

async function listOfferings({ businessId, query }) {
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

async function getOffering({ businessId, offeringId }) {
	await ensureBusinessExists(businessId);

	const offering = await ensureOfferingExists(businessId, offeringId);

	return offeringPresenter.present(offering);
}

async function updateOffering({
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

async function archiveOffering({
	businessId,
	offeringId,
	actor,
	requestMetadata,
}) {
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

async function restoreOffering({
	businessId,
	offeringId,
	actor,
	requestMetadata,
}) {
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
	createOffering,
	listOfferings,
	getOffering,
	updateOffering,
	archiveOffering,
	restoreOffering,
};
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
