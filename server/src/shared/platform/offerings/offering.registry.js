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
