import { createRegistry } from "../registry/index.js";

import { MODULES } from "../modules/index.js";

import { BUSINESS_TYPES } from "./businessType.constants.js";

const businessTypes = [
	{
		id: BUSINESS_TYPES.RETAIL,

		name: "Retail",

		description:
			"Businesses that primarily sell physical or digital products.",

		enabled: true,

		experimental: false,

		deprecated: false,

		modules: [
			MODULES.OVERVIEW,
			MODULES.COMMERCE,
			MODULES.CUSTOMERS,
			MODULES.FINANCE,
			MODULES.ANALYTICS,
			MODULES.SETTINGS,
		],

		metadata: {
			icon: "shopping-bag",

			color: "orange",

			illustration: "retail",

			category: "Commerce",

			onboarding: {
				title: "Retail Store",
				subtitle: "Manage products, inventory, pricing and customers.",
			},
		},
	},

	{
		id: BUSINESS_TYPES.RESTAURANT,

		name: "Restaurant",

		description: "Businesses providing food and beverage services.",

		enabled: true,

		experimental: false,

		deprecated: false,

		modules: [
			MODULES.OVERVIEW,
			MODULES.COMMERCE,
			MODULES.CUSTOMERS,
			MODULES.FINANCE,
			MODULES.OPERATIONS,
			MODULES.ANALYTICS,
			MODULES.SETTINGS,
		],

		metadata: {
			icon: "utensils-crossed",

			color: "red",

			illustration: "restaurant",

			category: "Food & Beverage",

			onboarding: {
				title: "Restaurant",

				subtitle:
					"Serve meals, manage tables, reservations and deliveries.",
			},
		},
	},

	{
		id: BUSINESS_TYPES.SALON,

		name: "Salon",

		description:
			"Businesses offering appointments and personal care services.",

		enabled: true,

		experimental: false,

		deprecated: false,

		modules: [
			MODULES.OVERVIEW,
			MODULES.COMMERCE,
			MODULES.CUSTOMERS,
			MODULES.OPERATIONS,
			MODULES.FINANCE,
			MODULES.ANALYTICS,
			MODULES.SETTINGS,
		],

		metadata: {
			icon: "scissors",

			color: "pink",

			illustration: "salon",

			category: "Beauty",

			onboarding: {
				title: "Salon",

				subtitle: "Appointments, staff scheduling and beauty services.",
			},
		},
	},

	{
		id: BUSINESS_TYPES.PROFESSIONAL_SERVICES,

		name: "Professional Services",

		description:
			"Consultants, electricians, plumbers, lawyers, accountants and similar businesses.",

		enabled: true,

		experimental: false,

		deprecated: false,

		modules: [
			MODULES.OVERVIEW,
			MODULES.COMMERCE,
			MODULES.CUSTOMERS,
			MODULES.OPERATIONS,
			MODULES.FINANCE,
			MODULES.ANALYTICS,
			MODULES.SETTINGS,
		],

		metadata: {
			icon: "briefcase-business",

			color: "blue",

			illustration: "professional-services",

			category: "Service",

			onboarding: {
				title: "Professional Services",

				subtitle:
					"Manage clients, appointments, projects, and professional services from one unified workspace.",
			},
		},
	},

	{
		id: BUSINESS_TYPES.HEALTHCARE,

		name: "Healthcare",

		description:
			"Healthcare providers including clinics and medical practices.",

		enabled: true,

		experimental: false,

		deprecated: false,

		modules: [
			MODULES.OVERVIEW,
			MODULES.CUSTOMERS,
			MODULES.OPERATIONS,
			MODULES.FINANCE,
			MODULES.ANALYTICS,
			MODULES.SETTINGS,
		],

		metadata: {
			icon: "stethoscope",

			color: "emerald",

			illustration: "healthcare",

			category: "Healthcare",

			onboarding: {
				title: "Healthcare Practice",

				subtitle:
					"Coordinate patients, appointments, staff, and healthcare operations securely and efficiently.",
			},
		},
	},

	{
		id: BUSINESS_TYPES.EDUCATION,

		name: "Education",

		description: "Educational institutions and training providers.",

		enabled: true,

		experimental: false,

		deprecated: false,

		modules: [
			MODULES.OVERVIEW,
			MODULES.CUSTOMERS,
			MODULES.OPERATIONS,
			MODULES.FINANCE,
			MODULES.ANALYTICS,
			MODULES.SETTINGS,
		],

		metadata: {
			icon: "graduation-cap",

			color: "indigo",

			illustration: "education",

			category: "Education",

			onboarding: {
				title: "Education Provider",

				subtitle:
					"Organize students, courses, instructors, schedules, and learning services in one platform.",
			},
		},
	},

	{
		id: BUSINESS_TYPES.HOSPITALITY,

		name: "Hospitality",

		description: "Hotels, lodges and accommodation providers.",

		enabled: true,

		experimental: false,

		deprecated: false,

		modules: [
			MODULES.OVERVIEW,
			MODULES.COMMERCE,
			MODULES.CUSTOMERS,
			MODULES.OPERATIONS,
			MODULES.FINANCE,
			MODULES.ANALYTICS,
			MODULES.SETTINGS,
		],

		metadata: {
			icon: "hotel",

			color: "amber",

			illustration: "hospitality",

			category: "Hospitality",

			onboarding: {
				title: "Hospitality Business",

				subtitle:
					"Manage guests, reservations, accommodation, and hospitality operations with ease.",
			},
		},
	},

	{
		id: BUSINESS_TYPES.RENTALS,

		name: "Rentals",

		description: "Businesses renting products, equipment or property.",

		enabled: true,

		experimental: false,

		deprecated: false,

		modules: [
			MODULES.OVERVIEW,
			MODULES.COMMERCE,
			MODULES.CUSTOMERS,
			MODULES.OPERATIONS,
			MODULES.FINANCE,
			MODULES.ANALYTICS,
			MODULES.SETTINGS,
		],

		metadata: {
			icon: "key-round",

			color: "violet",

			illustration: "rentals",

			category: "Rentals",

			onboarding: {
				title: "Rental Business",

				subtitle:
					"Track rentable assets, reservations, availability, and customer bookings effortlessly.",
			},
		},
	},

	{
		id: BUSINESS_TYPES.MANUFACTURING,

		name: "Manufacturing",

		description:
			"Businesses producing goods for wholesale or retail distribution.",

		enabled: true,

		experimental: false,

		deprecated: false,

		modules: [
			MODULES.OVERVIEW,
			MODULES.COMMERCE,
			MODULES.OPERATIONS,
			MODULES.FINANCE,
			MODULES.ANALYTICS,
			MODULES.SETTINGS,
		],

		metadata: {
			icon: "factory",

			color: "slate",

			illustration: "manufacturing",

			category: "Manufacturing",

			onboarding: {
				title: "Manufacturing Business",

				subtitle:
					"Oversee production, inventory, suppliers, and manufacturing workflows from a centralized dashboard.",
			},
		},
	},

	{
		id: BUSINESS_TYPES.AGRICULTURE,

		name: "Agriculture",

		description: "Agricultural producers and agribusinesses.",

		enabled: true,

		experimental: false,

		deprecated: false,

		modules: [
			MODULES.OVERVIEW,
			MODULES.COMMERCE,
			MODULES.OPERATIONS,
			MODULES.CUSTOMERS,
			MODULES.FINANCE,
			MODULES.ANALYTICS,
			MODULES.SETTINGS,
		],

		metadata: {
			icon: "tractor",

			color: "green",

			illustration: "agriculture",

			category: "Agriculture",

			onboarding: {
				title: "Agriculture Business",

				subtitle:
					"Manage agricultural operations, products, customers, and farm activities throughout the entire season.",
			},
		},
	},
];

export const businessTypeRegistry = createRegistry(businessTypes);
