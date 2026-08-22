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
11. Capacity
12. Location
13. Calendar
14. Scheduling


PHASE E — Customer Interaction
────────────────────────────────────

15. Booking
16. Registration
17. Enrollment


PHASE F — Specialized Offering Models
────────────────────────────────────

18. Membership
19. Subscription
20. Download
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
`~\server\src\modules\offering\components\pricing\builders\pricing.builder.js`;

class PricingBuilder {
	constructor() {
		this.pricing = {};
	}

	setBusiness(businessId) {
		this.pricing.business = businessId;
		return this;
	}

	setOffering(offeringId) {
		this.pricing.offering = offeringId;
		return this;
	}

	setAmount(amount) {
		this.pricing.amount = amount;
		return this;
	}

	setCostPrice(costPrice) {
		this.pricing.costPrice = costPrice ?? null;
		return this;
	}

	setCurrency(currency) {
		this.pricing.currency = currency;
		return this;
	}

	setBillingModel(billingModel) {
		this.pricing.billingModel = billingModel;
		return this;
	}

	setEffectiveFrom(date) {
		this.pricing.effectiveFrom = date;
		return this;
	}

	setEffectiveTo(date) {
		this.pricing.effectiveTo = date;
		return this;
	}

	setCurrent(isCurrent = true) {
		this.pricing.isCurrent = isCurrent;
		return this;
	}

	setStatus(status) {
		this.pricing.status = status;
		return this;
	}

	setChangeReason(reason) {
		this.pricing.changeReason = reason;
		return this;
	}

	setMetadata(metadata = {}) {
		this.pricing.metadata = metadata;
		return this;
	}

	setCreatedBy(userId) {
		this.pricing.createdBy = userId;
		return this;
	}

	setUpdatedBy(userId) {
		this.pricing.updatedBy = userId;
		return this;
	}

	build() {
		return Object.freeze({
			...this.pricing,
		});
	}
}

export default PricingBuilder;
```

```js
`~\server\src\modules\offering\components\pricing\builders\pricing.factory.js`;

import PricingBuilder from "./pricing.builder.js";

import {
	BILLING_MODELS,
	CURRENCIES,
	OFFERING_PRICE_STATUS,
} from "../../../../../shared/index.js";

function createPricing({ businessId, offeringId, data, actor }) {
	return new PricingBuilder()
		.setBusiness(businessId)
		.setOffering(offeringId)
		.setAmount(data.amount)
		.setCostPrice(data.costPrice)
		.setCurrency(data.currency ?? CURRENCIES.KES)
		.setBillingModel(data.billingModel ?? BILLING_MODELS.ONE_TIME)
		.setEffectiveFrom(data.effectiveFrom ?? new Date())
		.setEffectiveTo(data.effectiveTo ?? null)
		.setCurrent(true)
		.setStatus(OFFERING_PRICE_STATUS.ACTIVE)
		.setChangeReason(data.changeReason)
		.setMetadata(data.metadata ?? {})
		.setCreatedBy(actor.id)
		.build();
}

export default {
	createPricing,
};
```

```js
`~\server\src\modules\offering\components\pricing\pricing.component.js`;

import componentContract from "../component.contract.js";

import { pricingService } from "./services/index.js";

import { setCurrentPricingSchema } from "./validators/index.js";

/**
 * Pricing Component
 *
 * Integrates the Pricing domain into the Offering lifecycle.
 *
 * The component never performs pricing logic itself.
 * It delegates all pricing operations to the Pricing Service.
 */
export const pricingComponent = {
	...componentContract,

	validateCreate(context) {
		if (!context.data.pricing) {
			return;
		}

		setCurrentPricingSchema.parse(context.data.pricing);
	},

	validateUpdate(context) {
		if (!context.data.pricing) {
			return;
		}

		setCurrentPricingSchema.parse(context.data.pricing);
	},

	/**
	 * Create the initial price immediately after
	 * the Offering has been created.
	 */
	async afterCreate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (!data?.pricing) {
			return;
		}

		const pricing = await pricingService.setCurrentPrice({
			businessId,
			offeringId: offering.id,
			data: data.pricing,
			actor,
		});

		state.pricing = pricing;
	},

	/**
	 * Updating pricing creates a new immutable version.
	 */
	async afterUpdate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (!data?.pricing) {
			return;
		}

		const pricing = await pricingService.setCurrentPrice({
			businessId,
			offeringId: offering.id,
			data: data.pricing,
			actor,
		});

		state.pricing = pricing;
	},
};

export default pricingComponent;
```

```js
`~\server\src\modules\offering\components\pricing\controllers\pricing.controller.js`;

import {
	validateRequest,
	asyncHandler,
	success,
} from "../../../../../shared/index.js";

import { pricingService } from "../services/index.js";

import { setCurrentPricingSchema } from "../validators/index.js";

import { businessOfferingParamsSchema } from "../../shared/index.js";

/**
 * Pricing did need independent API operations, but as domain operations rather than CRUD endpoints.
 */

const getCurrentPricing = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessOfferingParamsSchema,
		},
		req,
	);

	const pricing = await pricingService.getCurrent(
		params.businessId,
		params.offeringId,
	);

	return success(
		res,
		pricing,
		"Current offering price retrieved successfully.",
	);
});

const setCurrentPricing = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessOfferingParamsSchema,
			body: setCurrentPricingSchema,
		},
		req,
	);

	const pricing = await pricingService.setCurrentPrice({
		businessId: params.businessId,
		offeringId: params.offeringId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, pricing, "Offering price updated successfully.");
});

const getPricingHistory = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessOfferingParamsSchema,
		},
		req,
	);

	const history = await pricingService.getHistory(
		params.businessId,
		params.offeringId,
	);

	return success(
		res,
		history,
		"Offering pricing history retrieved successfully.",
	);
});

export default {
	getCurrentPricing,
	setCurrentPricing,
	getPricingHistory,
};
```

```js
`~\server\src\modules\offering\components\pricing\services\pricing.service.js`;

import mongoose from "mongoose";

import { pricingFactory } from "../builders/index.js";
import { pricingPresenter } from "../presenters/index.js";
import { pricingRepository } from "../repositories/index.js";

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

/**
 * Pricing Domain Service
 *
 * Owns pricing business rules.
 *
 * Pricing is immutable.
 * Updating a price creates a new version.
 *
 * The only public write operation is setting the current price.
 * Internally, the service determines whether it is the first
 * price or a replacement.
 */
class PricingService {
	ensurePricingComponentSupported(offering) {
		return ensureOfferingSupportsComponent(
			offering,
			OFFERING_COMPONENTS.PRICING,
			"Pricing is not supported for this offering.",
		);
	}

	buildAuditMetadata(data) {
		return {};
	}

	/**
	 * Sets the current price for an Offering.
	 *
	 * Validation of the pricing payload is performed by the
	 * Pricing Component before this service is invoked.
	 *
	 * Persistence is transactional:
	 *
	 * 1. Ensure business exists.
	 * 2. Ensure Offering exists within this business.
	 * 3. Start transaction.
	 * 4. Find current price.
	 * 5. Expire current price if one exists.
	 * 6. Create new immutable price.
	 * 7. Commit transaction.
	 * 8. Return created price.
	 */
	async setCurrentPrice({
		businessId,
		offeringId,
		data,
		actor,
		requestMetadata,
	}) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensurePricingComponentSupported(offering);

		const session = await mongoose.startSession();

		try {
			session.startTransaction();

			const current = await pricingRepository.findCurrentByOffering(
				offeringId,
				session,
			);

			if (current) {
				await pricingRepository.expireCurrentPrice(
					offeringId,
					{
						effectiveTo: new Date(),
						updatedBy: actor.id,
					},
					session,
				);
			}

			const pricing = pricingFactory.createPricing({
				businessId,
				offeringId,
				data,
				actor,
			});

			const created = await pricingRepository.create(pricing, session);

			await auditLogService.log({
				business: businessId,
				entityType: AUDIT_ENTITY_TYPES.OFFERING_PRICING,
				entityId: created.id,
				action: AUDIT_ACTIONS.OFFERING_PRICING_CREATED,
				actor,
				requestMetadata,
				metadata: this.buildAuditMetadata(created),
			});

			await session.commitTransaction();

			return pricingPresenter.present(created);
		} catch (error) {
			await session.abortTransaction();

			throw error;
		} finally {
			await session.endSession();
		}
	}

	async getCurrent(businessId, offeringId) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensurePricingComponentSupported(offering);

		const pricing =
			await pricingRepository.findCurrentByOffering(offeringId);

		return pricingPresenter.present(pricing);
	}

	async getHistory(businessId, offeringId) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensurePricingComponentSupported(offering);

		const history =
			await pricingRepository.findHistoryByOffering(offeringId);

		return pricingPresenter.presentCollection(history);
	}
}

export const pricingService = new PricingService();

export default pricingService;
```

```js
`~\server\src\modules\offering\components\pricing\models\pricing.model.js`;

import mongoose from "mongoose";

import {
	BILLING_MODEL_VALUES,
	BILLING_MODELS,
	CURRENCIES,
	CURRENCY_VALUES,
	OFFERING_PRICE_STATUS,
	OFFERING_PRICE_STATUS_VALUES,
} from "../../../../../shared/index.js";

/**
 * #### Pricing Model V1
 *
 * Features such as multiple currencies, tiered pricing, promotions, taxes, regional pricing, and price histories can be layered on later without changing the core model.
 *
 * #### Immutable product pricing.
 *
 * Every price change creates a new document.
 * Existing records are never modified except for lifecycle fields
 * such as isCurrent/status/effectiveTo when superseded.
 */
const pricingSchema = new mongoose.Schema(
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

		amount: {
			type: mongoose.Schema.Types.Decimal128,
			required: true,
			min: 0,
		},

		costPrice: {
			type: mongoose.Schema.Types.Decimal128,
			default: null,
			min: 0,
		},

		currency: {
			type: String,
			enum: CURRENCY_VALUES,
			default: CURRENCIES.KES,
			required: true,
		},

		billingModel: {
			type: String,
			enum: BILLING_MODEL_VALUES,
			default: BILLING_MODELS.ONE_TIME,
		},

		effectiveFrom: {
			type: Date,
			default: Date.now,
			index: true,
		},

		effectiveTo: {
			type: Date,
			default: null,
		},

		isCurrent: {
			type: Boolean,
			default: true,
		},

		status: {
			type: String,
			enum: OFFERING_PRICE_STATUS_VALUES,
			default: OFFERING_PRICE_STATUS.ACTIVE,
			index: true,
		},

		changeReason: {
			type: String,
			trim: true,
			default: null,
		},

		metadata: {
			type: Map,
			of: mongoose.Schema.Types.Mixed,
			default: {},
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

/*
|--------------------------------------------------------------------------
| Indexes
|--------------------------------------------------------------------------
*/

/**
 * Price history.
 */
pricingSchema.index({
	offering: 1,
	effectiveFrom: -1,
});

/**
 * Business queries.
 */
pricingSchema.index({
	business: 1,
	offering: 1,
});

/**
 * Ensure only one current price exists per product.
 */
pricingSchema.index(
	{
		offering: 1,
		isCurrent: 1,
	},
	{
		unique: true,
		partialFilterExpression: {
			isCurrent: true,
		},
	},
);

export const OfferingPricing =
	mongoose.models.OfferingPricing ||
	mongoose.model("OfferingPricing", pricingSchema);

export default OfferingPricing;
```

```js
`~\server\src\modules\offering\components\pricing\repositories\pricing.repository.js`;

import { OFFERING_PRICE_STATUS } from "../../../../../shared/index.js";
import { OfferingPricing } from "../models/index.js";

class PricingRepository {
	async create(data, session = null) {
		const [pricing] = await OfferingPricing.create([data], {
			session,
		});

		return pricing;
	}

	async save(pricing, session = null) {
		return pricing.save({
			session,
		});
	}

	async findById(id) {
		return OfferingPricing.findById(id);
	}

	async findCurrentByOffering(offeringId, session = null) {
		return OfferingPricing.findOne({
			offering: offeringId,
			isCurrent: true,
		}).session(session);
	}

	async findHistoryByOffering(offeringId) {
		return OfferingPricing.find({
			offering: offeringId,
		}).sort({
			effectiveFrom: -1,
		});
	}

	async findCurrentByBusiness(businessId) {
		return OfferingPricing.find({
			business: businessId,
			isCurrent: true,
		}).sort({
			createdAt: -1,
		});
	}

	async expireCurrentPrice(
		offeringId,
		{ effectiveTo = new Date(), updatedBy = null } = {},
		session = null,
	) {
		const current = await OfferingPricing.findOne({
			offering: offeringId,
			isCurrent: true,
		}).session(session);

		if (!current) {
			return null;
		}

		current.isCurrent = false;
		current.effectiveTo = effectiveTo;
		current.updatedBy = updatedBy;
		current.status = OFFERING_PRICE_STATUS.INACTIVE;

		return this.save(current, session);
	}

	/**
	 * Administrative cleanup only
	 */
	async delete(id) {
		return OfferingPricing.findByIdAndDelete(id);
	}
}

export default new PricingRepository();
```

```js
`~\server\src\modules\offering\components\pricing\routes\pricing.routes.js`;

import { Router } from "express";

import pricingController from "../controllers/pricing.controller.js";

import { requirePermission } from "../../../../identity/index.js";

import { Permissions } from "../../../../../shared/index.js";

const router = Router({
	mergeParams: true,
});

router.get(
	"/",
	requirePermission(Permissions.OFFERING_VIEW),
	pricingController.getCurrentPricing,
);

router.put(
	"/",
	requirePermission(Permissions.OFFERING_UPDATE),
	pricingController.setCurrentPricing,
);

router.get(
	"/history",
	requirePermission(Permissions.OFFERING_VIEW),
	pricingController.getPricingHistory,
);

export default router;
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

We may proceed to creating the Capacity offering component, it's implementation should follow the following structure and if you see fit, use the Pricing, Media and or Categories offering components as a point of reference:

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
