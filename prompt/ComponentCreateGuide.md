```bash
PHASE A — Shared Offering Components
────────────────────────────────────

1. Metadata (covered)
2. Tags (covered)
3. Categories (covered)
4. Media (covered)
5. SEO (covered)


PHASE B — Offering Structure
────────────────────────────────────

6. Attributes (covered)
7. Variants  (covered)


PHASE C — Commerce Operations
────────────────────────────────────

8. Pricing (covered)
9. Inventory  (partially covered)


PHASE D — Availability / Time
────────────────────────────────────

10. Duration  (covered)
11. Capacity  (covered)
12. Location (covered)
13. Calendar (covered)
14. Scheduling (covered)


PHASE E — Customer Interaction
────────────────────────────────────

15. Booking (covered)
16. Registration (covered)
17. Enrollment
18. Instructor


PHASE F — Specialized Offering Models
────────────────────────────────────

19. Membership
20. Subscription
21. Download
```

- The following information shows a portion of some of the implemented offering components and more:

---

`offering.routes.js`
`offeringComponent.registry.js`
`offering.registry.js`

---

```js
`~\server\src\modules\offering\builders\offering.builder.js`;

import {
	AppError,
	ErrorCodes,
	HTTP_STATUS,
	offeringRegistry,
} from "../../../shared/index.js";

/**
 * Builds only the core Offering document.
 *
 * Component-owned data must never be persisted through this builder.
 *
 * Core Offering ownership:
 * - business
 * - type
 * - slug
 * - name
 * - shortDescription
 * - description
 * - status
 * - visibility
 * - searchable
 * - featured
 * - metadata
 * - createdBy
 * - updatedBy
 */
export function buildOffering({ businessId, data, slug, actor }) {
	const definition = offeringRegistry.get(data.type);

	if (!definition) {
		throw new AppError(
			`Unknown offering type "${data.type}".`,
			HTTP_STATUS.NOT_FOUND,
			ErrorCodes.NOT_FOUND,
		);
	}

	const defaults = definition.defaults ?? {};

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
			...(defaults.metadata ?? {}),
			...(data.metadata ?? {}),
		},

		createdBy: actor.id,

		updatedBy: actor.id,
	};
}
```

```js
`~\server\src\modules\offering\components\scheduling\scheduling.component.js`;

import componentContract from "../component.contract.js";

import { schedulingService } from "./services/index.js";

import { setSchedulingSchema } from "./validators/index.js";

const schedulingComponent = {
	...componentContract,

	validateCreate(context) {
		if (context.data.scheduling === undefined) {
			return;
		}

		setSchedulingSchema.parse(context.data.scheduling);
	},

	validateUpdate(context) {
		if (context.data.scheduling === undefined) {
			return;
		}

		setSchedulingSchema.parse(context.data.scheduling);
	},

	async afterCreate(context) {
		if (context.data.scheduling === undefined) {
			return;
		}

		const scheduling = await schedulingService.setScheduling({
			businessId: context.businessId,
			offeringId: context.offering.id,
			data: context.data.scheduling,
			actor: context.actor,
			requestMetadata: context.requestMetadata,
		});

		context.state.scheduling = scheduling;
	},

	async afterUpdate(context) {
		if (context.data.scheduling === undefined) {
			return;
		}

		const scheduling = await schedulingService.setScheduling({
			businessId: context.businessId,
			offeringId: context.offering.id,
			data: context.data.scheduling,
			actor: context.actor,
			requestMetadata: context.requestMetadata,
		});

		context.state.scheduling = scheduling;
	},
};

export default schedulingComponent;
```

```js
`~\server\src\modules\offering\components\scheduling\routes\scheduling.routes.js`;

import { Router } from "express";

import { authenticate, requirePermission } from "../../../../identity/index.js";

import { Permissions } from "../../../../../shared/index.js";

import { schedulingController } from "../controllers/index.js";

const router = Router({
	mergeParams: true,
});

router.use(authenticate);

router.get(
	"/",
	requirePermission(Permissions.OFFERING_VIEW),
	schedulingController.getScheduling,
);

router.put(
	"/",
	requirePermission(Permissions.OFFERING_UPDATE),
	schedulingController.setScheduling,
);

export default router;
```

```js
`~\server\src\modules\offering\components\scheduling\controllers\scheduling.controller.js`;

import {
	asyncHandler,
	success,
	validateRequest,
} from "../../../../../shared/index.js";

import { businessOfferingParamsSchema } from "../../shared/index.js";

import { schedulingService } from "../services/index.js";
import { setSchedulingSchema } from "../validators/index.js";

const getScheduling = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessOfferingParamsSchema,
		},
		req,
	);

	const scheduling = await schedulingService.getScheduling(
		params.businessId,
		params.offeringId,
	);

	return success(
		res,
		scheduling,
		"Offering scheduling retrieved successfully.",
	);
});

const setScheduling = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessOfferingParamsSchema,
			body: setSchedulingSchema,
		},
		req,
	);

	const scheduling = await schedulingService.setScheduling({
		businessId: params.businessId,
		offeringId: params.offeringId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(
		res,
		scheduling,
		"Offering scheduling updated successfully.",
	);
});

export default {
	getScheduling,
	setScheduling,
};
```

```js
`~\server\src\modules\offering\components\scheduling\services\scheduling.service.js`;

import {
	ensureBusinessExists,
	ensureOfferingExists,
} from "../../shared/index.js";

import {
	AUDIT_ACTIONS,
	AUDIT_ENTITY_TYPES,
	ensureOfferingSupportsComponent,
	OFFERING_COMPONENTS,
} from "../../../../../shared/index.js";

import { auditLogService } from "../../../../audit/index.js";

import { schedulingFactory } from "../builders/index.js";
import { schedulingPresenter } from "../presenters/index.js";
import { schedulingRepository } from "../repositories/index.js";

class SchedulingService {
	ensureSchedulingSupported(offering) {
		ensureOfferingSupportsComponent(
			offering,
			OFFERING_COMPONENTS.SCHEDULING,
			"Scheduling is not supported for this offering.",
		);
	}

	buildAuditMetadata(scheduling) {
		return {
			offeringId: scheduling.offering,
			schedulingId: scheduling.id,
			mode: scheduling.mode,
			timezone: scheduling.timezone,
			active: scheduling.active,
		};
	}

	async setScheduling({
		businessId,
		offeringId,
		data,
		actor,
		requestMetadata,
	}) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureSchedulingSupported(offering);

		let scheduling = await schedulingRepository.findByBusinessAndOffering(
			businessId,
			offeringId,
		);

		if (!scheduling) {
			const assignment = schedulingFactory.createSchedulingAssignment({
				businessId,
				offeringId,
				data,
				actor,
			});

			scheduling = await schedulingRepository.create(assignment);

			await auditLogService.log({
				business: businessId,
				entityType: AUDIT_ENTITY_TYPES.OFFERING_SCHEDULING,
				entityId: scheduling.id,
				action: AUDIT_ACTIONS.OFFERING_SCHEDULING_CREATED,
				actor,
				requestMetadata,
				metadata: this.buildAuditMetadata(scheduling),
			});
		} else {
			scheduling.mode = data.mode;
			scheduling.timezone = data.timezone;
			scheduling.active = data.active ?? scheduling.active;
			scheduling.updatedBy = actor.id;

			await schedulingRepository.save(scheduling);

			await auditLogService.log({
				business: businessId,
				entityType: AUDIT_ENTITY_TYPES.OFFERING_SCHEDULING,
				entityId: scheduling.id,
				action: AUDIT_ACTIONS.OFFERING_SCHEDULING_UPDATED,
				actor,
				requestMetadata,
				metadata: this.buildAuditMetadata(scheduling),
			});
		}

		return schedulingPresenter.present(scheduling);
	}

	async getScheduling(businessId, offeringId) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureSchedulingSupported(offering);

		const scheduling = await schedulingRepository.findByBusinessAndOffering(
			businessId,
			offeringId,
		);

		return schedulingPresenter.present(scheduling);
	}
}

export const schedulingService = new SchedulingService();

export default schedulingService;
```

```js
`~\server\src\modules\offering\components\scheduling\builders\scheduling.builder.js`;

class SchedulingBuilder {
	constructor() {
		this.scheduling = {};
	}

	setBusiness(businessId) {
		this.scheduling.business = businessId;
		return this;
	}

	setOffering(offeringId) {
		this.scheduling.offering = offeringId;
		return this;
	}

	setMode(mode) {
		this.scheduling.mode = mode;
		return this;
	}

	setTimezone(timezone) {
		this.scheduling.timezone = timezone;
		return this;
	}

	setActive(active) {
		this.scheduling.active = active;
		return this;
	}

	setCreatedBy(userId) {
		this.scheduling.createdBy = userId;
		return this;
	}

	setUpdatedBy(userId) {
		this.scheduling.updatedBy = userId;
		return this;
	}

	build() {
		return Object.freeze({
			...this.scheduling,
		});
	}
}

export default SchedulingBuilder;
```

```js
`~\server\src\modules\offering\components\scheduling\builders\scheduling.factory.js`;

import SchedulingBuilder from "./scheduling.builder.js";

function createSchedulingAssignment({ businessId, offeringId, data, actor }) {
	return new SchedulingBuilder()
		.setBusiness(businessId)
		.setOffering(offeringId)
		.setMode(data.mode)
		.setTimezone(data.timezone)
		.setActive(data.active ?? true)
		.setCreatedBy(actor.id)
		.setUpdatedBy(actor.id)
		.build();
}

export default {
	createSchedulingAssignment,
};
```

```js
`~\server\src\modules\offering\components\scheduling\models\OfferingScheduling.js`;

import mongoose from "mongoose";

import {
	OFFERING_SCHEDULING_MODE,
	OFFERING_SCHEDULING_MODE_VALUES,
} from "../../../../../shared/index.js";

const offeringSchedulingSchema = new mongoose.Schema(
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
			index: true,
		},

		mode: {
			type: String,
			required: true,
			enum: OFFERING_SCHEDULING_MODE_VALUES,
			default: OFFERING_SCHEDULING_MODE.FIXED,
		},

		timezone: {
			type: String,
			required: true,
			trim: true,
			default: "Africa/Nairobi",
			maxlength: 100,
		},

		active: {
			type: Boolean,
			default: true,
			index: true,
		},

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
		versionKey: false,
	},
);

offeringSchedulingSchema.index(
	{
		business: 1,
		offering: 1,
	},
	{
		unique: true,
	},
);

export const OfferingScheduling =
	mongoose.models.OfferingScheduling ||
	mongoose.model("OfferingScheduling", offeringSchedulingSchema);

export default OfferingScheduling;
```

```js
`~\server\src\modules\offering\components\scheduling\repositories\scheduling.repository.js`;

import { OfferingScheduling } from "../models/index.js";

class SchedulingRepository {
	async create(data) {
		return OfferingScheduling.create(data);
	}

	async findByOffering(offeringId) {
		return OfferingScheduling.findOne({
			offering: offeringId,
		});
	}

	async findByBusinessAndOffering(businessId, offeringId) {
		return OfferingScheduling.findOne({
			business: businessId,
			offering: offeringId,
		});
	}

	async save(scheduling) {
		return scheduling.save();
	}

	async deleteByOffering(offeringId) {
		return OfferingScheduling.deleteOne({
			offering: offeringId,
		});
	}
}

export const schedulingRepository = new SchedulingRepository();

export default schedulingRepository;
```

```js
`~\server\src\modules\offering\components\scheduling\presenters\scheduling.presenter.js`;

import { getId } from "../../../../../shared/index.js";

class SchedulingPresenter {
	present(scheduling) {
		if (!scheduling) {
			return null;
		}

		return {
			id: scheduling.id,

			businessId: getId(scheduling.business),

			offeringId: getId(scheduling.offering),

			mode: scheduling.mode,
			timezone: scheduling.timezone,
			active: scheduling.active,

			createdBy: getId(scheduling.createdBy),

			updatedBy: getId(scheduling.updatedBy),

			createdAt: scheduling.createdAt,
			updatedAt: scheduling.updatedAt,
		};
	}
}

export const schedulingPresenter = new SchedulingPresenter();

export default schedulingPresenter;
```

```js
`~\server\src\modules\offering\components\scheduling\validators\scheduling.schema.js`;

import { z } from "zod";

import { OFFERING_SCHEDULING_MODE_VALUES } from "../../../../../shared/index.js";

export const schedulingModeSchema = z.enum(OFFERING_SCHEDULING_MODE_VALUES);

export const setSchedulingSchema = z.object({
	mode: schedulingModeSchema,

	timezone: z
		.string()
		.trim()
		.min(1, "Timezone is required.")
		.max(100, "Timezone cannot exceed 100 characters."),

	active: z.boolean().optional(),
});

export default setSchedulingSchema;
```

```js
`~\server\src\modules\offering\components\calendar\services\calendar.service.js`;

import {
	ensureBusinessExists,
	ensureOfferingExists,
} from "../../shared/index.js";

import {
	AUDIT_ACTIONS,
	AUDIT_ENTITY_TYPES,
	ensureOfferingSupportsComponent,
	OFFERING_COMPONENTS,
} from "../../../../../shared/index.js";

import { auditLogService } from "../../../../audit/index.js";

import { calendarFactory } from "../builders/index.js";
import { calendarPresenter } from "../presenters/index.js";
import { calendarRepository } from "../repositories/index.js";

class CalendarService {
	ensureCalendarSupported(offering) {
		ensureOfferingSupportsComponent(
			offering,
			OFFERING_COMPONENTS.CALENDAR,
			"Calendar is not supported for this offering.",
		);
	}

	ensureSchedulingSupported(offering) {
		ensureOfferingSupportsComponent(
			offering,
			OFFERING_COMPONENTS.SCHEDULING,
			"Calendar requires Scheduling support.",
		);
	}

	buildAuditMetadata(calendar) {
		return {
			offeringId: calendar.offering,
			calendarId: calendar.id,
			name: calendar.name,
			timezone: calendar.timezone,
			type: calendar.type,
			active: calendar.active,
		};
	}

	async setCalendar({
		businessId,
		offeringId,
		data,
		actor,
		requestMetadata,
	}) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureCalendarSupported(offering);

		this.ensureSchedulingSupported(offering);

		let calendar = await calendarRepository.findByOfferingAndBusiness(
			businessId,
			offeringId,
		);

		if (!calendar) {
			const assignment = calendarFactory.createCalendarAssignment({
				businessId,
				offeringId,
				data,
				actor,
			});

			calendar = await calendarRepository.create(assignment);

			await auditLogService.log({
				business: businessId,
				entityType: AUDIT_ENTITY_TYPES.OFFERING_CALENDAR,
				entityId: calendar.id,
				action: AUDIT_ACTIONS.OFFERING_CALENDAR_CREATED,
				actor,
				requestMetadata,
				metadata: this.buildAuditMetadata(calendar),
			});
		} else {
			calendar.name = data.name;
			calendar.timezone = data.timezone;
			calendar.type = data.type;
			calendar.active = data.active ?? true;
			calendar.updatedBy = actor.id;

			await calendarRepository.save(calendar);

			await auditLogService.log({
				business: businessId,
				entityType: AUDIT_ENTITY_TYPES.OFFERING_CALENDAR,
				entityId: calendar.id,
				action: AUDIT_ACTIONS.OFFERING_CALENDAR_UPDATED,
				actor,
				requestMetadata,
				metadata: this.buildAuditMetadata(calendar),
			});
		}

		return calendarPresenter.present(calendar);
	}

	async getCalendar(businessId, offeringId) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureCalendarSupported(offering);

		const calendar = await calendarRepository.findByOfferingAndBusiness(
			businessId,
			offeringId,
		);

		return calendarPresenter.present(calendar);
	}
}

export const calendarService = new CalendarService();

export default calendarService;
```

```js
`~\server\src\modules\offering\components\attributes\builders\attributes.factory.js`;

import AttributesBuilder from "./attributes.builder.js";

function createAttribute({ businessId, offeringId, attribute, actor }) {
	return new AttributesBuilder()
		.setBusiness(businessId)
		.setOffering(offeringId)
		.setName(attribute.name)
		.setValues(attribute.values)
		.setCreatedBy(actor.id)
		.setUpdatedBy(actor.id)
		.build();
}

export default {
	createAttribute,
};
```

```js
`~\server\src\modules\offering\components\attributes\models\attributes.model.js`;

import mongoose from "mongoose";

const attributesSchema = new mongoose.Schema(
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
		},

		name: {
			type: String,
			required: true,
			trim: true,
			maxlength: 100,
		},

		values: {
			type: [String],
			required: true,
			validate: {
				validator(values) {
					return values.length >= 1 && values.length <= 100;
				},
				message: "An attribute must contain between 1 and 100 values.",
			},
		},

		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		updatedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			default: null,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

attributesSchema.index({
	offering: 1,
});

attributesSchema.index(
	{
		offering: 1,
		name: 1,
	},
	{
		unique: true,
		collation: {
			locale: "en",
			strength: 2,
		},
	},
);

export const OfferingAttribute =
	mongoose.models.OfferingAttribute ||
	mongoose.model("OfferingAttribute", attributesSchema);

export default OfferingAttribute;
```

```js
`~\server\src\modules\offering\components\attributes\repositories\attributes.repository.js`;

import { OfferingAttribute } from "../models/index.js";

class AttributesRepository {
	async create(data, session = null) {
		const [attribute] = await OfferingAttribute.create([data], {
			session,
		});

		return attribute;
	}

	async createMany(data, session = null) {
		if (!data.length) {
			return [];
		}

		return OfferingAttribute.insertMany(data, {
			session,
		});
	}

	async findByOffering(offeringId) {
		return OfferingAttribute.find({
			offering: offeringId,
		}).sort({
			createdAt: 1,
		});
	}

	async findByOfferingAndName(offeringId, name) {
		return OfferingAttribute.findOne({
			offering: offeringId,
			name,
		}).collation({
			locale: "en",
			strength: 2,
		});
	}

	async deleteByOffering(offeringId, session = null) {
		return OfferingAttribute.deleteMany(
			{
				offering: offeringId,
			},
			{
				session,
			},
		);
	}
}

export default new AttributesRepository();
```

```js
`~\server\src\modules\offering\components\attributes\services\attributes.service.js`;

import mongoose from "mongoose";

import { attributesFactory } from "../builders/index.js";
import { attributesPresenter } from "../presenters/index.js";
import { attributesRepository } from "../repositories/index.js";

import { normalizeAttributes } from "../validators/index.js";

import {
	ensureBusinessExists,
	ensureOfferingExists,
} from "../../shared/index.js";

import {
	AUDIT_ACTIONS,
	AUDIT_ENTITY_TYPES,
	ensureOfferingSupportsComponent,
	OFFERING_COMPONENTS,
} from "../../../../../shared/index.js";
import { auditLogService } from "../../../../audit/index.js";

class AttributesService {
	ensureAttributeComponentSupported(offering) {
		return ensureOfferingSupportsComponent(
			offering,
			OFFERING_COMPONENTS.ATTRIBUTES,
			"Attributes are not supported for this offering.",
		);
	}

	buildAuditMetadata(data) {
		return {
			offeringId: data.offering,
			createdBy: data.createdBy,
			updatedBy: data.updatedBy,
		};
	}

	async setAttributes({
		businessId,
		offeringId,
		attributes = [],
		actor,
		requestMetadata,
	}) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureAttributeComponentSupported(offering);

		const normalizedAttributes = normalizeAttributes(attributes);

		const session = await mongoose.startSession();

		try {
			session.startTransaction();

			await attributesRepository.deleteByOffering(offeringId, session);

			const assignments = normalizedAttributes.map((attribute) =>
				attributesFactory.createAttribute({
					businessId,
					offeringId,
					attribute,
					actor,
				}),
			);

			const created = await attributesRepository.createMany(
				assignments,
				session,
			);

			await auditLogService.log({
				business: businessId,
				entityType: AUDIT_ENTITY_TYPES.OFFERING_ATTRIBUTES,
				entityId: created.id,
				action: AUDIT_ACTIONS.OFFERING_CREATED,
				actor,
				requestMetadata,
				metadata: this.buildAuditMetadata(created),
			});

			await session.commitTransaction();

			return attributesPresenter.presentCollection(created);
		} catch (error) {
			await session.abortTransaction();
			throw error;
		} finally {
			await session.endSession();
		}
	}

	async getByOffering(businessId, offeringId) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureAttributeComponentSupported(offering);

		const attributes =
			await attributesRepository.findByOffering(offeringId);

		return attributesPresenter.presentCollection(attributes);
	}
}

export const attributesService = new AttributesService();

export default attributesService;
```

```js
`~\server\src\modules\offering\components\attributes\attributes.component.js`;

import componentContract from "../component.contract.js";

import attributesSchema from "./validators/attributes.schema.js";
import { normalizeAttributes } from "./validators/index.js";

import { attributesService } from "./services/index.js";

export const attributesComponent = {
	...componentContract,

	validateCreate(context) {
		if (context.data.attributes === undefined) {
			return;
		}

		attributesSchema.parse(context.data.attributes);
	},

	validateUpdate(context) {
		if (context.data.attributes === undefined) {
			return;
		}

		attributesSchema.parse(context.data.attributes);
	},

	beforeCreate(context) {
		if (context.data.attributes === undefined) {
			return;
		}

		context.data.attributes = normalizeAttributes(context.data.attributes);
	},

	beforeUpdate(context) {
		if (context.data.attributes === undefined) {
			return;
		}

		context.data.attributes = normalizeAttributes(context.data.attributes);
	},

	async afterCreate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (data.attributes === undefined) {
			return;
		}

		const attributes = await attributesService.setAttributes({
			businessId,
			offeringId: offering.id,
			attributes: data.attributes,
			actor,
		});

		state.attributes = attributes;
	},

	async afterUpdate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (data.attributes === undefined) {
			return;
		}

		const attributes = await attributesService.setAttributes({
			businessId,
			offeringId: offering.id,
			attributes: data.attributes,
			actor,
		});

		state.attributes = attributes;
	},
};

export default attributesComponent;
```

```js
`~\server\src\modules\offering\components\attributes\validators\attributes.normalizer.js`;

import {
	AppError,
	ErrorCodes,
	HTTP_STATUS,
} from "../../../../../shared/index.js";

/**
 * Normalizes an individual attribute.
 *
 * Attribute names and values retain their display casing,
 * while surrounding whitespace is removed.
 *
 * Duplicate values are removed case-insensitively.
 */
export function normalizeAttribute(attribute) {
	const name = attribute.name.trim();

	const values = [];
	const seenValues = new Set();

	for (const value of attribute.values) {
		const normalizedValue = value.trim();
		const key = normalizedValue.toLowerCase();

		if (seenValues.has(key)) {
			continue;
		}

		seenValues.add(key);
		values.push(normalizedValue);
	}

	return {
		name,
		values,
	};
}

/**
 * Normalizes the complete attribute collection.
 *
 * Attribute names must be unique case-insensitively.
 *
 * Example:
 *
 * Color
 * color
 *
 * is rejected rather than silently discarded.
 */
export function normalizeAttributes(attributes = []) {
	const normalized = [];
	const seenNames = new Set();

	for (const attribute of attributes) {
		const normalizedAttribute = normalizeAttribute(attribute);
		const key = normalizedAttribute.name.toLowerCase();

		if (seenNames.has(key)) {
			throw new AppError(
				`Duplicate attribute name "${normalizedAttribute.name}".`,
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.BAD_REQUEST,
			);
		}

		seenNames.add(key);
		normalized.push(normalizedAttribute);
	}

	return normalized;
}

export default {
	normalizeAttribute,
	normalizeAttributes,
};
```

```js
`~\server\src\modules\offering\components\attributes\validators\attributes.schema.js`;

import { z } from "zod";

const attributeSchema = z.object({
	name: z.string().trim().min(1).max(100),

	values: z.array(z.string().trim().min(1).max(100)).min(1).max(100),
});

export const attributesSchema = z.array(attributeSchema).max(50);

export default attributesSchema;
```

We may proceed to creating the Booking offering component, it's implementation should follow the same following structure as the others and if you see fit, use the Pricing, Media and or Categories offering components as a point of reference:

```bash
├── builders/
├── controllers/
├── models/
├── presenters/
├── repositories/
├── routes/
├── services/
├── validators/
└── media.component.js
```

Before implementation analyze:

- What responsibility does it own?
- What Offering Types use it?
- What other components does it depend on?
- What components may depend on it?
- What lifecycle hooks does it participate in?
- What validation does it perform?
- What invariants must remain true?
- What business concept does it represent?
- What API does it require?
- What permissions are required?
- What audit events are required?
- What frontend experience will eventually consume it?

Only after this analysis should implementation begin.
