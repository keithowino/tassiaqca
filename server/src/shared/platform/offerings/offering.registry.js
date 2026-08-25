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
			OFFERING_COMPONENTS.DURATION,
			OFFERING_COMPONENTS.SCHEDULING,
			OFFERING_COMPONENTS.CALENDAR,
			OFFERING_COMPONENTS.BOOKING,
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
			OFFERING_COMPONENTS.CALENDAR,
			OFFERING_COMPONENTS.BOOKING,
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
			OFFERING_COMPONENTS.BOOKING,
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

		/**
		 * #### Order matters
		 *
		 * - Registration must precede Enrollment because Enrollment declares Registration as a dependency.
		 */
		components: [
			OFFERING_COMPONENTS.PRICING,
			OFFERING_COMPONENTS.MEDIA,
			OFFERING_COMPONENTS.REGISTRATION,
			OFFERING_COMPONENTS.ENROLLMENT,
			OFFERING_COMPONENTS.INSTRUCTOR,
			OFFERING_COMPONENTS.DURATION,
			OFFERING_COMPONENTS.CAPACITY,
			OFFERING_COMPONENTS.LOCATION,
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
