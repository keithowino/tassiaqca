- Phase 1 — Introduce an Offering Component Registry (done)
- Phase 2 — Replace Boolean Configuration in the Offering Registry (done)
- Let's proceed to Phase 3 — Build Component Pipelines

Introduce lifecycle handlers for each reusable component.

Examples include:

Pricing Pipeline
Inventory Pipeline
Media Pipeline
Scheduling Pipeline
Registration Pipeline

These pipelines execute only when the offering declares the corresponding component. While on that, this is the current state of `~\server\src\shared\platform\offeringComponents\offeringComponent.constants.js`:

```js
export const OFFERING_COMPONENTS = Object.freeze({
	/**
	 * Commercial
	 */
	PRICING: "PRICING",

	INVENTORY: "INVENTORY",

	VARIANTS: "VARIANTS",

	CATEGORIES: "CATEGORIES",

	/**
	 * Content
	 */
	MEDIA: "MEDIA",

	ATTRIBUTES: "ATTRIBUTES",

	TAGS: "TAGS",

	SEO: "SEO",

	METADATA: "METADATA",

	/**
	 * Scheduling
	 */
	SCHEDULING: "SCHEDULING",

	CALENDAR: "CALENDAR",

	BOOKING: "BOOKING",

	/**
	 * Access
	 */
	MEMBERSHIP: "MEMBERSHIP",

	SUBSCRIPTION: "SUBSCRIPTION",

	REGISTRATION: "REGISTRATION",

	/**
	 * Digital
	 */
	DOWNLOAD: "DOWNLOAD",

	/**
	 * Education
	 */
	ENROLLMENT: "ENROLLMENT",

	INSTRUCTOR: "INSTRUCTOR",

	DURATION: "DURATION",

	/**
	 * Events
	 */
	CAPACITY: "CAPACITY",

	LOCATION: "LOCATION",
});
```

but in `~\server\src\shared\platform\offerings\offering.registry.js` there are instances in the components arrays where you have mentioned items such as OFFERING_COMPONENTS.RECURRING_BILLING, OFFERING_COMPONENTS.EVENT_REGISTRATION, OFFERING_COMPONENTS.BOOKING_CALENDAR and OFFERING_COMPONENTS.DOWNLOADABLE_ASSET which do not exist.

```js
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

	// configuration: {
	// 	supportsVariants: false,
	// 	supportsInventory: false,
	// 	supportsScheduling: false,
	// },

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

		// configuration: {
		// 	...baseOffering.configuration,
		// 	supportsVariants: true,
		// 	supportsInventory: true,
		// },
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

		// configuration: {
		// 	...baseOffering.configuration,
		// 	supportsScheduling: true,
		// },
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

		// configuration: {
		// 	...baseOffering.configuration,
		// 	supportsScheduling: true,
		// },
		components: [
			OFFERING_COMPONENTS.PRICING,
			OFFERING_COMPONENTS.SCHEDULING,
			OFFERING_COMPONENTS.BOOKING_CALENDAR,
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

		// configuration: {
		// 	...baseOffering.configuration,
		// 	supportsInventory: true,
		// },
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
			OFFERING_COMPONENTS.RECURRING_BILLING,
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
			OFFERING_COMPONENTS.RECURRING_BILLING,
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

		components: [OFFERING_COMPONENTS.PRICING, OFFERING_COMPONENTS.MEDIA],
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
			OFFERING_COMPONENTS.EVENT_REGISTRATION,
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
			OFFERING_COMPONENTS.DOWNLOADABLE_ASSET,
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

	// 	/**
	// 	 * Default configuration for now
	// 	 */
	// },
];

export const offeringRegistry = createRegistry(
	offerings,
	(offering) => offering.type,
);

export default offeringRegistry;
```
