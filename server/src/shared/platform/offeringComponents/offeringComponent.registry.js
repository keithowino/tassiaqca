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
import inventoryComponent from "../../../modules/offering/components/inventory/inventory.component.js";
import durationComponent from "../../../modules/offering/components/duration/duration.component.js";
import capacityComponent from "../../../modules/offering/components/capacity/capacity.component.js";
import locationComponent from "../../../modules/offering/components/location/location.component.js";
import calendarComponent from "../../../modules/offering/components/calendar/calendar.component.js";
import schedulingComponent from "../../../modules/offering/components/scheduling/scheduling.component.js";
import bookingComponent from "../../../modules/offering/components/booking/booking.component.js";
import registrationComponent from "../../../modules/offering/components/registration/registration.component.js";

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
		implementation: inventoryComponent,
		category: OFFERING_COMPONENT_CATEGORIES.COMMERCIAL,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [],
		metadata: {
			offeringTypes: ["PRODUCT"],
		},
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
		implementation: schedulingComponent,
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
		implementation: calendarComponent,
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
		implementation: bookingComponent,
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
		implementation: registrationComponent,
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
		implementation: durationComponent,
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
		implementation: capacityComponent,
		category: OFFERING_COMPONENT_CATEGORIES.EVENTS,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [],
		metadata: {
			offeringTypes: ["EVENT", "COURSE", "BOOKING"],
		},
	},

	{
		id: OFFERING_COMPONENTS.LOCATION,
		name: "Location",
		description: "Stores event location.",
		implementation: locationComponent,
		category: OFFERING_COMPONENT_CATEGORIES.EVENTS,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [],
		metadata: {
			offeringTypes: ["EVENT", "COURSE"],
		},
	},
];

export const offeringComponentRegistry = createRegistry(components);

export default offeringComponentRegistry;
