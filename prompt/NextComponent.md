You mentioned, the key point is not to start implementing Attributes next merely because it appears next on a list and that we should first perform a Component Dependency Review. For every component, we should establish:

- What responsibility does it own?
- What Offering Types use it?
- What other components does it depend on?
- What components may depend on it?
- Does it operate at Offering level, Variant level, or another entity level?
- Does it own persistence or merely project/configure existing data?
- What lifecycle hooks does it participate in?
- What happens when it is absent?
- What validation does it perform?
- What invariants must remain true?

You also recommended to implement the components in this order:

```bash
PHASE A — Shared Offering Components
────────────────────────────────────

1. Metadata
2. Tags
3. Categories
4. Media
5. SEO


PHASE B — Offering Structure
────────────────────────────────────

6. Attributes
7. Variants


PHASE C — Commerce Operations
────────────────────────────────────

8. Inventory


PHASE D — Availability / Time
────────────────────────────────────

9. Duration
10. Capacity
11. Location
12. Calendar
13. Scheduling


PHASE E — Customer Interaction
────────────────────────────────────

14. Booking
15. Registration
16. Enrollment


PHASE F — Specialized Offering Models
────────────────────────────────────

17. Membership
18. Subscription
19. Download
```

---

# A Portion of TassiaQCA Folder Structure

```bash
├── client/
│   └── ...
├── server/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── commerce/
│   │   │   │   ├── adapters/
│   │   │   │   │   ├── booking.projection.js
│   │   │   │   │   ├── course.projection.js
│   │   │   │   │   ├── digitalDownload.projection.js
│   │   │   │   │   ├── event.projection.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── membership.projection.js
│   │   │   │   │   ├── package.projection.js
│   │   │   │   │   ├── product.projection.js
│   │   │   │   │   ├── rental.projection.js
│   │   │   │   │   ├── service.projection.js
│   │   │   │   │   └── subscription.projection.js
│   │   │   │   ├── controllers/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── product.controller.js
│   │   │   │   ├── models/
│   │   │   │   │   ├── Booking.js
│   │   │   │   │   ├── Course.js
│   │   │   │   │   ├── DigitalDownload.js
│   │   │   │   │   ├── Event.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── Membership.js
│   │   │   │   │   ├── Package.js
│   │   │   │   │   ├── Product.js
│   │   │   │   │   ├── Rental.js
│   │   │   │   │   ├── Service.js
│   │   │   │   │   └── Subscription.js
│   │   │   │   ├── presenters/
│   │   │   │   │   └── product.presenter.js
│   │   │   │   ├── repositories/
│   │   │   │   │   ├── booking.repository.js
│   │   │   │   │   ├── course.repository.js
│   │   │   │   │   ├── digitalDownload.repository.js
│   │   │   │   │   ├── event.repository.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── membership.repository.js
│   │   │   │   │   ├── package.repository.js
│   │   │   │   │   ├── product.repository.js
│   │   │   │   │   ├── rental.repository.js
│   │   │   │   │   ├── service.repository.js
│   │   │   │   │   └── subscription.repository.js
│   │   │   │   ├── routes/
│   │   │   │   │   ├── product.routes.js
│   │   │   │   │   └── README.md
│   │   │   │   ├── services/
│   │   │   │   │   └── product.service.js
│   │   │   │   ├── validators/
│   │   │   │   │   └── product.validator.js
│   │   │   │   └── index.js
│   │   │   ├── offering/
│   │   │   │   ├── builders/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── offering.builder.js
│   │   │   │   │   └── offering.factory.js
│   │   │   │   ├── components/
│   │   │   │   │   ├── pricing/
│   │   │   │   │   │   ├── builders/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   ├── pricing.builder.js
│   │   │   │   │   │   │   └── pricing.factory.js
│   │   │   │   │   │   ├── models/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── pricing.model.js
│   │   │   │   │   │   ├── presenters/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── pricing.presenter.js
│   │   │   │   │   │   ├── repositories/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── pricing.repository.js
│   │   │   │   │   │   ├── services/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── pricing.service.js
│   │   │   │   │   │   ├── validators/
│   │   │   │   │   │   │   ├── createPricing.schema.js
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   ├── pricingParams.schema.js
│   │   │   │   │   │   │   └── updatePricing.schema.js
│   │   │   │   │   │   └── pricing.component.js
│   │   │   │   │   ├── component.contract.js
│   │   │   │   │   ├── component.pipeline.js
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
│   │   │   │   ├── lifecycles/
│   │   │   │   │   ├── shared/
│   │   │   │   │   │   └── offering.lifecycle.js
│   │   │   │   │   ├── booking.lifecycle.js
│   │   │   │   │   ├── course.lifecycle.js
│   │   │   │   │   ├── digitalDownload.lifecycle.js
│   │   │   │   │   ├── event.lifecycle.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── lifecycle.factory.js
│   │   │   │   │   ├── membership.lifecycle.js
│   │   │   │   │   ├── package.lifecycle.js
│   │   │   │   │   ├── product.lifecycle.js
│   │   │   │   │   ├── rental.lifecycle.js
│   │   │   │   │   ├── service.lifecycle.js
│   │   │   │   │   └── subscription.lifecycle.js
│   │   │   │   ├── models/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── offering.model.js
│   │   │   │   ├── presenters/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── offering.presenter.js
│   │   │   │   ├── projections/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── noop.projection.js
│   │   │   │   │   └── projection.contract.js
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
│   │   └── shared/
│   │       ├── constants/
│   │       │   ├── auditActions.js
│   │       │   ├── auditEntityTypes.js
│   │       │   ├── categoryStatus.js
│   │       │   ├── cookies.js
│   │       │   ├── httpStatus.js
│   │       │   ├── index.js
│   │       │   ├── inventoryStatus.js
│   │       │   ├── permissions.js
│   │       │   ├── pricing.js
│   │       │   ├── productImage.js
│   │       │   ├── ProductStatus.js
│   │       │   ├── productVariantStatus.js
│   │       │   └── stockMovement.js
│   │       ├── database/
│   │       │   ├── index.js
│   │       │   ├── populates.js
│   │       │   └── transaction.js
│   │       ├── errors/
│   │       │   ├── AppError.js
│   │       │   ├── ErrorCodes.js
│   │       │   ├── errorHandler.js
│   │       │   ├── index.js
│   │       │   ├── notFound.js
│   │       │   └── uploadErrorHandler.js
│   │       ├── platform/
│   │       │   ├── businessTypes/
│   │       │   │   ├── businessType.constants.js
│   │       │   │   ├── businessType.registry.js
│   │       │   │   └── index.js
│   │       │   ├── capabilities/
│   │       │   │   ├── capability.constants.js
│   │       │   │   ├── capability.registry.js
│   │       │   │   ├── capabilityCategory.constants.js
│   │       │   │   └── index.js
│   │       │   ├── domains/
│   │       │   │   └── domain.constants.js
│   │       │   ├── modules/
│   │       │   │   ├── index.js
│   │       │   │   ├── module.constants.js
│   │       │   │   └── module.registry.js
│   │       │   ├── offeringComponents/
│   │       │   │   ├── index.js
│   │       │   │   ├── offeringComponent.constants.js
│   │       │   │   ├── offeringComponent.registry.js
│   │       │   │   ├── offeringComponent.utils.js
│   │       │   │   └── offeringComponentCategory.constants.js
│   │       │   ├── offerings/
│   │       │   │   ├── index.js
│   │       │   │   ├── offering.constants.js
│   │       │   │   ├── offering.registry.js
│   │       │   │   └── offeringCategory.constants.js
│   │       │   └── registry/
│   │       │       ├── index.js
│   │       │       ├── registry.bootstrap.js
│   │       │       ├── registry.js
│   │       │       ├── registry.utils.js
│   │       │       └── registry.validator.js
│   │       └── ...
│   └── ...
└── ...
```

---

We may proceed, for reference and also to avoid inconsistencies here is the current states of the following files:

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
} from "../../../../../shared/constants/index.js";

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
`~\server\src\modules\offering\components\pricing\models\pricing.model.js`;

import mongoose from "mongoose";

import {
	BILLING_MODEL_VALUES,
	BILLING_MODELS,
	CURRENCIES,
	CURRENCY_VALUES,
	OFFERING_PRICE_STATUS,
	OFFERING_PRICE_STATUS_VALUES,
} from "../../../../../shared/constants/index.js";

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

export default mongoose.model("Pricing", pricingSchema);
```

```js
`~\server\src\modules\offering\components\pricing\presenters\pricing.presenter.js`;

import { getId } from "../../../../../shared/utils/presenter.js";

const toNumber = (value) => {
	if (value == null) {
		return null;
	}

	return Number(value.toString());
};

function present(pricing) {
	if (!pricing) {
		return null;
	}

	const businessId = getId(pricing.business);

	return {
		id: pricing.id,

		// // Keep commented for now till i confirm why it chose business: pricing.business,
		// businessId,
		business: pricing.business,

		offering: pricing.offering,

		amount: toNumber(pricing.amount),

		costPrice: toNumber(pricing.costPrice),

		currency: pricing.currency,

		billingModel: pricing.billingModel,

		effectiveFrom: pricing.effectiveFrom,

		effectiveTo: pricing.effectiveTo,

		isCurrent: pricing.isCurrent,

		status: pricing.status,

		changeReason: pricing.changeReason,

		metadata: pricing.metadata,

		createdBy: pricing.createdBy,

		updatedBy: pricing.updatedBy,

		createdAt: pricing.createdAt,

		updatedAt: pricing.updatedAt,
	};
}

function presentCollection(pricings = []) {
	return pricings.map(present);
}

export default {
	present,

	presentCollection,
};
```

```js
`~\server\src\modules\offering\components\pricing\repositories\pricing.repository.js`;

import { OFFERING_PRICE_STATUS } from "../../../../../shared/constants/index.js";
import { Pricing } from "../models/index.js";

class PricingRepository {
	async create(data, session = null) {
		const [pricing] = await Pricing.create([data], {
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
		return Pricing.findById(id);
	}

	async findCurrentByOffering(offeringId, session = null) {
		return Pricing.findOne({
			offering: offeringId,
			isCurrent: true,
		}).session(session);
	}

	async findHistoryByOffering(offeringId) {
		return Pricing.find({
			offering: offeringId,
		}).sort({
			effectiveFrom: -1,
		});
	}

	async findCurrentByBusiness(businessId) {
		return Pricing.find({
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
		const current = await Pricing.findOne({
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
		return Pricing.findByIdAndDelete(id);
	}
}

export default new PricingRepository();
```

```js
`~\server\src\modules\offering\components\pricing\services\pricing.service.js`;

import mongoose from "mongoose";

import { pricingFactory } from "../builders/index.js";
import { pricingPresenter } from "../presenters/index.js";
import { pricingRepository } from "../repositories/index.js";

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
	/**
	 * Sets the current price for an offering.
	 *
	 * If a current price exists it is retired.
	 * A brand-new immutable price record is then created.
	 */
	async setCurrentPrice({ businessId, offeringId, data, actor }) {
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

			await session.commitTransaction();

			return pricingPresenter.present(created);
		} catch (error) {
			await session.abortTransaction();

			throw error;
		} finally {
			await session.endSession();
		}
	}

	/**
	 * Returns the active price.
	 */
	async getCurrent(offeringId) {
		const pricing =
			await pricingRepository.findCurrentByOffering(offeringId);

		return pricingPresenter.present(pricing);
	}

	/**
	 * Returns immutable pricing history.
	 */
	async getHistory(offeringId) {
		const history =
			await pricingRepository.findHistoryByOffering(offeringId);

		return pricingPresenter.presentCollection(history);
	}
}

export const pricingService = new PricingService();

export default pricingService;
```

```js
`~\server\src\modules\offering\components\pricing\pricing.component.js`;

import componentContract from "../component.contract.js";

import { pricingService } from "./services/index.js";

import {
	createPricingSchema,
	updatePricingSchema,
} from "./validators/index.js";

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

		createPricingSchema.parse(context.data.pricing);
	},

	validateUpdate(context) {
		if (!context.data.pricing) {
			return;
		}

		updatePricingSchema.parse(context.data.pricing);
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
`~\server\src\modules\offering\components\component.contract.js`;

/**
 * Offering Component Contract
 *
 * Every reusable offering component (Pricing, Inventory, Media,
 * Scheduling, Registration, etc.) implements this contract.
 *
 * Components participate in the Offering lifecycle through
 * validation hooks and lifecycle hooks executed by the
 * Component Pipeline.
 *
 * Implementations may override only the hooks they require.
 */

const noop = async () => {};

export const componentContract = Object.freeze({
	/*
	|--------------------------------------------------------------------------
	| Validation
	|--------------------------------------------------------------------------
	*/

	async validateCreate() {
		return noop();
	},

	async validateUpdate() {
		return noop();
	},

	/*
	|--------------------------------------------------------------------------
	| Lifecycle
	|--------------------------------------------------------------------------
	*/

	async beforeCreate() {
		return noop();
	},

	async afterCreate() {
		return noop();
	},

	async beforeUpdate() {
		return noop();
	},

	async afterUpdate() {
		return noop();
	},

	async beforeArchive() {
		return noop();
	},

	async afterArchive() {
		return noop();
	},

	async beforeRestore() {
		return noop();
	},

	async afterRestore() {
		return noop();
	},
});

export default componentContract;
```

```js
`~\server\src\modules\offering\components\component.pipeline.js`;

import { resolveComponents } from "../../../shared/platform/offeringComponents/index.js";

/**
 * Executes a hook across every component
 * declared by an offering registration.
 *
 * Components are executed in registry order.
 *
 * The pipeline is completely generic. It knows nothing
 * about Pricing, Inventory, Media, Booking, etc.
 * It simply executes whichever hook is exposed by the
 * registered component implementation.
 */
async function execute(hook, context) {
	const { registration } = context;

	if (!registration) {
		return;
	}

	const components = resolveComponents(registration);

	for (const component of components) {
		const handler = component?.[hook];

		if (typeof handler !== "function") {
			continue;
		}

		await handler(context);
	}
}

/*
|--------------------------------------------------------------------------
| Validation
|--------------------------------------------------------------------------
*/

const validateCreate = (context) => execute("validateCreate", context);

const validateUpdate = (context) => execute("validateUpdate", context);

/*
|--------------------------------------------------------------------------
| Lifecycle
|--------------------------------------------------------------------------
*/

const beforeCreate = (context) => execute("beforeCreate", context);

const afterCreate = (context) => execute("afterCreate", context);

const beforeUpdate = (context) => execute("beforeUpdate", context);

const afterUpdate = (context) => execute("afterUpdate", context);

const beforeArchive = (context) => execute("beforeArchive", context);

const afterArchive = (context) => execute("afterArchive", context);

const beforeRestore = (context) => execute("beforeRestore", context);

const afterRestore = (context) => execute("afterRestore", context);

export default {
	/*
	|--------------------------------------------------------------------------
	| Validation
	|--------------------------------------------------------------------------
	*/

	validateCreate,

	validateUpdate,

	/*
	|--------------------------------------------------------------------------
	| Lifecycle
	|--------------------------------------------------------------------------
	*/

	beforeCreate,

	afterCreate,

	beforeUpdate,

	afterUpdate,

	beforeArchive,

	afterArchive,

	beforeRestore,

	afterRestore,
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

import { componentPipeline } from "../../components/index.js";

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
	/*
	|--------------------------------------------------------------------------
	| Validation
	|--------------------------------------------------------------------------
	*/

	async validateCreate(context) {
		await componentPipeline.validateCreate(context);
	},

	async validateUpdate(context) {
		await componentPipeline.validateUpdate(context);
	},

	/*
	|--------------------------------------------------------------------------
	| Lifecycle
	|--------------------------------------------------------------------------
	*/

	async beforeCreate(context) {
		await componentPipeline.beforeCreate(context);
	},

	async afterCreate(context) {
		await componentPipeline.afterCreate(context);
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

	await hooks.validateCreate(context);

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
```

```js
`~\server\src\shared\platform\offeringComponents\offeringComponent.registry.js`;

import { createRegistry } from "../registry/index.js";

import { OFFERING_COMPONENTS } from "./offeringComponent.constants.js";
import { OFFERING_COMPONENT_CATEGORIES } from "./offeringComponentCategory.constants.js";

import pricingComponent from "../../../modules/offering/components/pricing/pricing.component.js";

/**
 * From this point onward, adding a new reusable concern becomes entirely declarative:
 * 1. Create a component implementation.
 * 2. Register it in offeringComponent.registry.js.
 * 3. Add it to an offering's components array.
 */
const components = [
	/**
	 * Commercial
	 */

	{
		id: OFFERING_COMPONENTS.PRICING,
		name: "Pricing",
		description: "Provides pricing information for an offering.",
		implementation: pricingComponent,
		category: OFFERING_COMPONENT_CATEGORIES.COMMERCIAL,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [],
		metadata: {},
	},

	{
		id: OFFERING_COMPONENTS.INVENTORY,
		name: "Inventory",
		description: "Tracks inventory and stock availability.",
		// implementation: inventoryComponent,
		category: OFFERING_COMPONENT_CATEGORIES.COMMERCIAL,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [],
		metadata: {},
	},

	{
		id: OFFERING_COMPONENTS.VARIANTS,
		name: "Variants",
		description: "Supports multiple purchasable variants.",
		// implementation: variantsComponent,
		category: OFFERING_COMPONENT_CATEGORIES.COMMERCIAL,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [OFFERING_COMPONENTS.INVENTORY],
		metadata: {},
	},

	{
		id: OFFERING_COMPONENTS.CATEGORIES,
		name: "Categories",
		description: "Assigns offerings to categories.",
		// implementation: categoriesComponent,
		category: OFFERING_COMPONENT_CATEGORIES.COMMERCIAL,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [],
		metadata: {},
	},

	/**
	 * Content
	 */

	{
		id: OFFERING_COMPONENTS.MEDIA,
		name: "Media",
		description: "Stores media assets associated with an offering.",
		// implementation: mediaComponent,
		category: OFFERING_COMPONENT_CATEGORIES.CONTENT,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [],
		metadata: {},
	},

	{
		id: OFFERING_COMPONENTS.ATTRIBUTES,
		name: "Attributes",
		description: "Supports custom attributes for an offering.",
		// implementation: attributesComponent,
		category: OFFERING_COMPONENT_CATEGORIES.CONTENT,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [],
		metadata: {},
	},

	{
		id: OFFERING_COMPONENTS.TAGS,
		name: "Tags",
		description: "Provides tagging for search and organization.",
		// implementation: tagsComponent,
		category: OFFERING_COMPONENT_CATEGORIES.CONTENT,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [],
		metadata: {},
	},

	{
		id: OFFERING_COMPONENTS.SEO,
		name: "SEO",
		description: "Stores search engine optimization metadata.",
		// implementation: seoComponent,
		category: OFFERING_COMPONENT_CATEGORIES.CONTENT,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [],
		metadata: {},
	},

	{
		id: OFFERING_COMPONENTS.METADATA,
		name: "Metadata",
		description: "Stores arbitrary structured metadata.",
		// implementation: metadataComponent,
		category: OFFERING_COMPONENT_CATEGORIES.SHARED,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [],
		metadata: {},
	},

	/**
	 * Scheduling
	 */

	{
		id: OFFERING_COMPONENTS.SCHEDULING,
		name: "Scheduling",
		description: "Provides scheduling support.",
		// implementation: schedulingComponent,
		category: OFFERING_COMPONENT_CATEGORIES.SCHEDULING,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [],
		metadata: {},
	},

	{
		id: OFFERING_COMPONENTS.CALENDAR,
		name: "Calendar",
		description: "Provides calendar integration.",
		// implementation: calendarComponent,
		category: OFFERING_COMPONENT_CATEGORIES.SCHEDULING,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [OFFERING_COMPONENTS.SCHEDULING],
		metadata: {},
	},

	{
		id: OFFERING_COMPONENTS.BOOKING,
		name: "Booking",
		description: "Provides booking functionality.",
		// implementation: bookingComponent,
		category: OFFERING_COMPONENT_CATEGORIES.SCHEDULING,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [OFFERING_COMPONENTS.SCHEDULING],
		metadata: {},
	},

	/**
	 * Access
	 */

	{
		id: OFFERING_COMPONENTS.MEMBERSHIP,
		name: "Membership",
		description: "Provides membership access.",
		// implementation: membershipComponent,
		category: OFFERING_COMPONENT_CATEGORIES.ACCESS,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [],
		metadata: {},
	},

	{
		id: OFFERING_COMPONENTS.SUBSCRIPTION,
		name: "Subscription",
		description: "Provides recurring subscription support.",
		// implementation: subscriptionComponent,
		category: OFFERING_COMPONENT_CATEGORIES.ACCESS,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [],
		metadata: {},
	},

	{
		id: OFFERING_COMPONENTS.REGISTRATION,
		name: "Registration",
		description: "Supports registrations and enrollments.",
		// implementation: registrationComponent,
		category: OFFERING_COMPONENT_CATEGORIES.ACCESS,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [],
		metadata: {},
	},

	/**
	 * Digital
	 */

	{
		id: OFFERING_COMPONENTS.DOWNLOAD,
		name: "Download",
		description: "Provides downloadable assets.",
		// implementation: downloadComponent,
		category: OFFERING_COMPONENT_CATEGORIES.DIGITAL,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [],
		metadata: {},
	},

	/**
	 * Education
	 */

	{
		id: OFFERING_COMPONENTS.ENROLLMENT,
		name: "Enrollment",
		description: "Supports learner enrollment.",
		// implementation: enrollmentComponent,
		category: OFFERING_COMPONENT_CATEGORIES.EDUCATION,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [OFFERING_COMPONENTS.REGISTRATION],
		metadata: {},
	},

	{
		id: OFFERING_COMPONENTS.INSTRUCTOR,
		name: "Instructor",
		description: "Stores instructor information.",
		// implementation: instructorComponent,
		category: OFFERING_COMPONENT_CATEGORIES.EDUCATION,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [],
		metadata: {},
	},

	{
		id: OFFERING_COMPONENTS.DURATION,
		name: "Duration",
		description: "Stores duration information.",
		// implementation: durationComponent,
		category: OFFERING_COMPONENT_CATEGORIES.EDUCATION,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [],
		metadata: {},
	},

	/**
	 * Events
	 */

	{
		id: OFFERING_COMPONENTS.CAPACITY,
		name: "Capacity",
		description: "Controls attendee capacity.",
		// implementation: capacityComponent,
		category: OFFERING_COMPONENT_CATEGORIES.EVENTS,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [],
		metadata: {},
	},

	{
		id: OFFERING_COMPONENTS.LOCATION,
		name: "Location",
		description: "Stores event location.",
		// implementation: locationComponent,
		category: OFFERING_COMPONENT_CATEGORIES.EVENTS,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [],
		metadata: {},
	},
];

export const offeringComponentRegistry = createRegistry(components);

export default offeringComponentRegistry;
```

```js
`~\server\src\shared\platform\offeringComponents\offeringComponent.utils.js`;

import { offeringComponentRegistry } from "./offeringComponent.registry.js";

export function resolveComponents(registration) {
	return (registration.components ?? [])
		.map((id) => offeringComponentRegistry.get(id))
		.filter(Boolean)
		.map((component) => component.implementation);
}
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

import {
	productProjection,
	serviceProjection,
	rentalProjection,
	membershipProjection,
	subscriptionProjection,
	courseProjection,
	eventProjection,
	packageProjection,
	digitalDownloadProjection,
	bookingProjection,
} from "../../../modules/commerce/adapters/index.js";
import { noopProjection } from "../../../modules/offering/projections/index.js";

import { OFFERING_COMPONENTS } from "../offeringComponents/index.js";

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

		components: [
			OFFERING_COMPONENTS.PRICING,
			OFFERING_COMPONENTS.MEDIA,
			OFFERING_COMPONENTS.INVENTORY,
			OFFERING_COMPONENTS.VARIANTS,
		],
	},

	{
		...baseOffering,

		type: OFFERING_TYPES.SERVICE,
		lifecycle: serviceLifecycle,

		projection: serviceProjection,
		category: OFFERING_CATEGORIES.TIME_BASED,
		label: "Service",
		description: "Professional or business service.",

		components: [
			OFFERING_COMPONENTS.PRICING,
			OFFERING_COMPONENTS.MEDIA,
			OFFERING_COMPONENTS.SCHEDULING,
		],
	},

	{
		...baseOffering,

		type: OFFERING_TYPES.BOOKING,
		lifecycle: bookingLifecycle,

		projection: bookingProjection,
		category: OFFERING_CATEGORIES.TIME_BASED,
		label: "Booking",
		description: "Reservable appointment or schedule.",

		components: [
			OFFERING_COMPONENTS.PRICING,
			OFFERING_COMPONENTS.SCHEDULING,
			OFFERING_COMPONENTS.BOOKING,
			OFFERING_COMPONENTS.CALENDAR,
		],
	},

	{
		...baseOffering,

		type: OFFERING_TYPES.RENTAL,
		lifecycle: rentalLifecycle,

		projection: rentalProjection,
		category: OFFERING_CATEGORIES.PHYSICAL,
		label: "Rental",
		description: "Assets rented for a duration.",

		components: [
			OFFERING_COMPONENTS.PRICING,
			OFFERING_COMPONENTS.MEDIA,
			OFFERING_COMPONENTS.INVENTORY,
			OFFERING_COMPONENTS.SCHEDULING,
		],
	},

	{
		...baseOffering,

		type: OFFERING_TYPES.MEMBERSHIP,
		lifecycle: membershipLifecycle,

		projection: membershipProjection,
		category: OFFERING_CATEGORIES.ACCESS,
		label: "Membership",
		description: "Recurring member access.",

		components: [
			OFFERING_COMPONENTS.PRICING,
			OFFERING_COMPONENTS.MEMBERSHIP,
		],
	},

	{
		...baseOffering,

		type: OFFERING_TYPES.SUBSCRIPTION,
		lifecycle: subscriptionLifecycle,

		projection: subscriptionProjection,
		category: OFFERING_CATEGORIES.ACCESS,
		label: "Subscription",
		description: "Recurring subscription.",

		components: [
			OFFERING_COMPONENTS.PRICING,
			OFFERING_COMPONENTS.SUBSCRIPTION,
		],
	},

	{
		...baseOffering,

		type: OFFERING_TYPES.COURSE,
		lifecycle: courseLifecycle,

		projection: courseProjection,
		category: OFFERING_CATEGORIES.DIGITAL,
		label: "Course",
		description: "Educational offering.",

		components: [
			OFFERING_COMPONENTS.PRICING,
			OFFERING_COMPONENTS.MEDIA,
			OFFERING_COMPONENTS.ENROLLMENT,
			OFFERING_COMPONENTS.INSTRUCTOR,
			OFFERING_COMPONENTS.DURATION,
		],
	},

	{
		...baseOffering,

		type: OFFERING_TYPES.EVENT,
		lifecycle: eventLifecycle,

		projection: eventProjection,
		category: OFFERING_CATEGORIES.EXPERIENCE,
		label: "Event",
		description: "Scheduled experience.",

		components: [
			OFFERING_COMPONENTS.PRICING,
			OFFERING_COMPONENTS.MEDIA,
			OFFERING_COMPONENTS.REGISTRATION,
			OFFERING_COMPONENTS.CAPACITY,
			OFFERING_COMPONENTS.LOCATION,
			OFFERING_COMPONENTS.SCHEDULING,
		],
	},

	{
		...baseOffering,

		type: OFFERING_TYPES.PACKAGE,
		lifecycle: packageLifecycle,

		/**
		 * Default projection for now.
		 */
		projection: packageProjection,
		category: OFFERING_CATEGORIES.EXPERIENCE,
		label: "Package",
		description: "Bundle of offerings.",

		components: [OFFERING_COMPONENTS.PRICING, OFFERING_COMPONENTS.MEDIA],
	},

	{
		...baseOffering,

		type: OFFERING_TYPES.DIGITAL_DOWNLOAD,
		lifecycle: digitalDownloadLifecycle,

		/**
		 * Default projection for now.
		 */
		projection: digitalDownloadProjection,
		category: OFFERING_CATEGORIES.DIGITAL,
		label: "Digital Download",
		description: "Downloadable digital asset.",

		components: [
			OFFERING_COMPONENTS.PRICING,
			OFFERING_COMPONENTS.MEDIA,
			OFFERING_COMPONENTS.DOWNLOAD,
		],
	},

	/**
	 * Future offerings guide.
	 */
	// {
	// 	...baseOffering,

	// 	type: OFFERING_TYPES.DIGITAL_DOWNLOAD,
	// 	lifecycle: digitalDownloadLifecycle,

	// 	/**
	// 	 * Default projection for now.
	// 	 */
	// 	projection: noopProjection,
	// 	category: OFFERING_CATEGORIES.DIGITAL,
	// 	label: "Digital Download",
	// 	description: "Downloadable digital asset.",
	// },
];

export const offeringRegistry = createRegistry(
	offerings,
	(offering) => offering.type,
);

export default offeringRegistry;
```
