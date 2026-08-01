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
