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
9. Inventory


PHASE D — Availability / Time
────────────────────────────────────

10. Duration
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

The following information shows a portion of some of the implemented offering components and more:

```js
`~\server\src\modules\offering\routes\offering.routes.js`;

import { Router } from "express";

import { offeringController } from "../controllers/index.js";

import authenticate from "../../identity/middleware/authenticate.js";
import requirePermission from "../../identity/middleware/requirePermission.js";

import { Permissions } from "../../../shared/index.js";

import { categoriesRoutes } from "../components/categories/routes/index.js";
import { pricingRoutes } from "../components/pricing/routes/index.js";
import { mediaRoutes } from "../components/media/routes/index.js";
import { attributesRoutes } from "../components/attributes/index.js";
import { tagsRoutes } from "../components/tags/index.js";
import { seoRoutes } from "../components/seo/index.js";
import { variantsRoutes } from "../components/variants/index.js";

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

router.use("/:offeringId/categories", categoriesRoutes);

router.use("/:offeringId/pricing", pricingRoutes);

router.use("/:offeringId/media", mediaRoutes);

router.use("/:offeringId/attributes", attributesRoutes);

router.use("/:offeringId/tags", tagsRoutes);

router.use("/:offeringId/seo", seoRoutes);

router.use("/:offeringId/variants", variantsRoutes);

export default router;
```

```js
`~\server\src\shared\platform\offeringComponents\offeringComponent.registry.js`;

import { createRegistry } from "../registry/index.js";

import { OFFERING_COMPONENTS } from "./offeringComponent.constants.js";
import { OFFERING_COMPONENT_CATEGORIES } from "./offeringComponentCategory.constants.js";

import pricingComponent from "../../../modules/offering/components/pricing/pricing.component.js";

import metadataComponent from "../../../modules/offering/components/metadata/metadata.component.js";
import tagsComponent from "../../../modules/offering/components/tags/tags.component.js";
import categoriesComponent from "../../../modules/offering/components/categories/categories.component.js";
import mediaComponent from "../../../modules/offering/components/media/media.component.js";
import seoComponent from "../../../modules/offering/components/seo/seo.component.js";
import variantsComponent from "../../../modules/offering/components/variants/variants.component.js";

import attributesComponent from "../../../modules/offering/components/attributes/attributes.component.js";

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
		implementation: variantsComponent,
		category: OFFERING_COMPONENT_CATEGORIES.COMMERCIAL,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [OFFERING_COMPONENTS.ATTRIBUTES],
		metadata: {
			offeringTypes: ["PRODUCT"],
			requiresAttributes: true,
		},
	},

	{
		id: OFFERING_COMPONENTS.CATEGORIES,
		name: "Categories",
		description: "Assigns offerings to categories.",
		implementation: categoriesComponent,
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
		implementation: mediaComponent,
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
		implementation: attributesComponent,
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
		implementation: tagsComponent,
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
		implementation: seoComponent,
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
		implementation: metadataComponent,
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

		/**
		 * This order is intentional
		 *
		 * The pipeline itself executes in registry order. Your current implementation already resolves the registered component implementations and executes the requested lifecycle hook sequentially.
		 */
		components: [
			OFFERING_COMPONENTS.PRICING,
			OFFERING_COMPONENTS.METADATA,
			OFFERING_COMPONENTS.TAGS,
			OFFERING_COMPONENTS.CATEGORIES,
			OFFERING_COMPONENTS.MEDIA,
			OFFERING_COMPONENTS.SEO,

			OFFERING_COMPONENTS.ATTRIBUTES,
			OFFERING_COMPONENTS.VARIANTS,

			OFFERING_COMPONENTS.INVENTORY,
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
	async setCurrentPrice({ businessId, offeringId, data, actor }) {
		await ensureBusinessExists(businessId);

		await ensureOfferingExists(businessId, offeringId);

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

	async getCurrent(businessId, offeringId) {
		await ensureBusinessExists(businessId);

		await ensureOfferingExists(businessId, offeringId);

		const pricing =
			await pricingRepository.findCurrentByOffering(offeringId);

		return pricingPresenter.present(pricing);
	}

	async getHistory(businessId, offeringId) {
		await ensureBusinessExists(businessId);

		await ensureOfferingExists(businessId, offeringId);

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

class AttributesService {
	async setAttributes({ businessId, offeringId, attributes = [], actor }) {
		await ensureBusinessExists(businessId);

		await ensureOfferingExists(businessId, offeringId);

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

		await ensureOfferingExists(businessId, offeringId);

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

```js
`~\server\src\modules\offering\components\variants\models\offeringVariant.model.js`;

import mongoose from "mongoose";

import {
	OFFERING_VARIANT_STATUS,
	OFFERING_VARIANT_STATUS_VALUES,
} from "../../../../../shared/index.js";

const variantAttributeSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},

		value: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{
		_id: false,
	},
);

const offeringVariantSchema = new mongoose.Schema(
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

		sku: {
			type: String,
			required: true,
			trim: true,
			uppercase: true,
		},

		slug: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
		},

		attributes: {
			type: [variantAttributeSchema],
			required: true,

			validate: {
				validator(attributes) {
					return attributes.length > 0;
				},

				message: "At least one variant attribute is required.",
			},
		},

		/**
		 * Cached for analytics and filtering.
		 * Maintained by the service layer.
		 */
		attributeCount: {
			type: Number,
			required: true,
			min: 1,
		},

		/**
		 * Canonical representation of the attribute combination.
		 *
		 * Example:
		 *
		 * color=black|ram=16gb|storage=512gb
		 *
		 * Used for duplicate detection.
		 *
		 * Maintained by the service layer.
		 */
		attributeSignature: {
			type: String,
			required: true,
			trim: true,
			select: false,
		},

		status: {
			type: String,
			enum: OFFERING_VARIANT_STATUS_VALUES,
			default: OFFERING_VARIANT_STATUS.ACTIVE,
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

/**
 * Offering variants within a business.
 */
offeringVariantSchema.index({
	business: 1,
	offering: 1,
});

/**
 * SKU uniqueness.
 */
offeringVariantSchema.index(
	{
		business: 1,
		sku: 1,
	},
	{
		unique: true,
	},
);

/**
 * Slug uniqueness.
 */
offeringVariantSchema.index(
	{
		offering: 1,
		slug: 1,
	},
	{
		unique: true,
	},
);

/**
 * Prevent duplicate attribute combinations for the same offering.
 */
offeringVariantSchema.index(
	{
		offering: 1,
		attributeSignature: 1,
	},
	{
		unique: true,
	},
);

/**
 * Business/status queries.
 */
offeringVariantSchema.index({
	business: 1,
	status: 1,
});

export const OfferingVariant =
	mongoose.models.OfferingVariant ||
	mongoose.model("OfferingVariant", offeringVariantSchema);

export default OfferingVariant;
```

```js
`~\server\src\modules\offering\components\variants\services\variants.service.js`;

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
} from "../../../../../shared/index.js";

class VariantsService {
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
			metadata: {
				offeringId,
				sku: created.sku,
				attributes: created.attributes,
				attributeSignature: created.attributeSignature,
			},
		});

		return variantsPresenter.present(created);
	}

	async list({ businessId, offeringId, includeArchived = true }) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		await this.ensureProductOffering(offering);

		const variants = await variantsRepository.findByOffering(offeringId, {
			includeArchived,
		});

		return variantsPresenter.presentCollection(variants);
	}

	async getById({ businessId, offeringId, variantId }) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

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
			metadata: {
				offeringId,
				sku: updated.sku,
				attributes: updated.attributes,
				status: updated.status,
			},
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
			metadata: {
				offeringId,
				sku: archived.sku,
			},
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
			metadata: {
				offeringId,
				sku: restored.sku,
			},
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
```

```js
`~\server\src\modules\offering\components\variants\variants.component.js`;

import componentContract from "../component.contract.js";

import variantsSchema from "./validators/variants.schema.js";
import { normalizeVariants } from "./validators/index.js";

import { variantsService } from "./services/index.js";

export const variantsComponent = {
	...componentContract,

	validateCreate(context) {
		if (context.data.variants === undefined) {
			return;
		}

		variantsSchema.parse(context.data.variants);
	},

	validateUpdate(context) {
		if (context.data.variants === undefined) {
			return;
		}

		variantsSchema.parse(context.data.variants);
	},

	beforeCreate(context) {
		if (context.data.variants === undefined) {
			return;
		}

		context.data.variants = normalizeVariants(context.data.variants);
	},

	beforeUpdate(context) {
		if (context.data.variants === undefined) {
			return;
		}

		context.data.variants = normalizeVariants(context.data.variants);
	},

	async afterCreate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (data.variants === undefined) {
			return;
		}

		const variants = await variantsService.setVariants({
			businessId,
			offeringId: offering.id,
			variants: data.variants,
			actor,
		});

		state.variants = variants;
	},

	async afterUpdate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (data.variants === undefined) {
			return;
		}

		const variants = await variantsService.setVariants({
			businessId,
			offeringId: offering.id,
			variants: data.variants,
			actor,
		});

		state.variants = variants;
	},
};

export default variantsComponent;
```

We may proceed to creating the Inventory offering component, it's implementation should follow the following structure and if you see fit, use the Pricing, Media and or Categories offering components as a point of reference:

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
