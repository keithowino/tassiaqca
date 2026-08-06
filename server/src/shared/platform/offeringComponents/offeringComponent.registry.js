import { createRegistry } from "../registry/index.js";

import { OFFERING_COMPONENTS } from "./offeringComponent.constants.js";
import { OFFERING_COMPONENT_CATEGORIES } from "./offeringComponentCategory.constants.js";

const components = [
	/**
	 * Commercial
	 */

	{
		id: OFFERING_COMPONENTS.PRICING,
		name: "Pricing",
		description: "Provides pricing information for an offering.",
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
