import { createRegistry } from "../registry/index.js";

import { CAPABILITIES } from "../capabilities/index.js";

import { MODULES } from "./module.constants.js";
import {
	WIDGET_SIZES,
	WIDGET_TYPES,
} from "../../../modules/dashboard/index.js";

const modules = [
	{
		id: MODULES.OVERVIEW,

		name: "Overview",

		description:
			"Provide a high-level summary of business activity and key performance indicators.",

		enabled: true,

		experimental: false,

		deprecated: false,

		capabilities: [],

		metadata: {
			ui: {
				navigation: [
					{
						id: "overview",
						section: "workspace",
						order: 0,
						icon: "layout-dashboard",
						label: "Overview",
						default: true,
					},
				],

				routes: [
					{
						name: "overview",
						path: "/",
					},
				],

				widgets: [
					{
						id: "overview-summary",

						type: WIDGET_TYPES.SUMMARY,

						title: "Overview",

						size: WIDGET_SIZES.FULL,

						order: 10,
					},
				],
			},
		},
	},

	{
		id: MODULES.COMMERCE,

		name: "Commerce",

		description:
			"Manage offerings, inventory, pricing, suppliers, and commercial operations.",

		enabled: true,

		experimental: false,

		deprecated: false,

		capabilities: [
			CAPABILITIES.PRODUCT_CATALOG,

			CAPABILITIES.PRODUCT_VARIANTS,

			CAPABILITIES.CATEGORIES,

			CAPABILITIES.INVENTORY,

			CAPABILITIES.SUPPLIERS,

			CAPABILITIES.PRICING,

			CAPABILITIES.PROMOTIONS,
		],

		metadata: {
			ui: {
				navigation: [
					{
						id: "commerce",
						section: "business",
						order: 20,
						icon: "shopping-bag",
						label: "Commerce",
					},
				],

				routes: [
					{
						name: "commerce",
						path: "/commerce",
					},
				],

				widgets: [
					{
						id: "sales",

						type: WIDGET_TYPES.STAT,

						title: "Today's Sales",

						size: WIDGET_SIZES.SMALL,

						order: 20,
					},

					{
						id: "orders",

						type: WIDGET_TYPES.STAT,

						title: "Orders",

						size: WIDGET_SIZES.SMALL,

						order: 30,
					},

					{
						id: "inventory",

						type: WIDGET_TYPES.TABLE,

						title: "Inventory",

						size: WIDGET_SIZES.LARGE,

						order: 40,
					},
				],
			},
		},
	},

	{
		id: MODULES.CUSTOMERS,

		name: "Customers",

		description: "Manage customers, reviews, loyalty, and CRM.",

		enabled: true,

		experimental: false,

		deprecated: false,

		capabilities: [
			CAPABILITIES.CUSTOMERS,

			CAPABILITIES.CRM,

			CAPABILITIES.REVIEWS,

			CAPABILITIES.LOYALTY,
		],

		metadata: {
			ui: {
				navigation: [
					{
						id: "customers",
						section: "business",
						order: 30,
						icon: "users",
						label: "Customers",
					},
				],

				routes: [
					{
						name: "customers",
						path: "/customers",
					},
				],

				widgets: [
					{
						id: "customers",

						type: WIDGET_TYPES.STAT,

						title: "Customers",

						size: WIDGET_SIZES.SMALL,

						order: 50,
					},
				],
			},
		},
	},

	{
		id: MODULES.FINANCE,

		name: "Finance",

		description: "Manage billing, payments, and financial operations.",

		enabled: true,

		experimental: false,

		deprecated: false,

		capabilities: [
			CAPABILITIES.PAYMENTS,

			CAPABILITIES.FINANCE,

			CAPABILITIES.BILLING,
		],

		metadata: {
			ui: {
				navigation: [
					{
						id: "finance",
						section: "business",
						order: 40,
						icon: "wallet",
						label: "Finance",
					},
				],

				routes: [
					{
						name: "finance",
						path: "/finance",
					},
				],

				widgets: [
					{
						id: "cashflow",

						type: WIDGET_TYPES.CHART,

						title: "Cash Flow",

						size: WIDGET_SIZES.LARGE,

						order: 60,
					},
				],
			},
		},
	},

	{
		id: MODULES.OPERATIONS,

		name: "Operations",

		description:
			"Manage staff, scheduling, bookings, delivery, and day-to-day business operations.",

		enabled: true,

		experimental: false,

		deprecated: false,

		capabilities: [
			CAPABILITIES.STAFF,

			CAPABILITIES.SERVICES,

			CAPABILITIES.BOOKINGS,

			CAPABILITIES.CALENDAR,

			CAPABILITIES.DELIVERY,
		],

		metadata: {
			ui: {
				navigation: [
					{
						id: "operations",
						section: "business",
						order: 50,
						icon: "briefcase",
						label: "Operations",
					},
				],

				routes: [
					{
						name: "operations",
						path: "/operations",
					},
				],

				widgets: [
					{
						id: "today-schedule",
						type: WIDGET_TYPES.CALENDAR,
						title: "Today's Schedule",
						size: WIDGET_SIZES.LARGE,
						order: 70,
					},
					{
						id: "pending-tasks",
						type: WIDGET_TYPES.LIST,
						title: "Pending Tasks",
						size: WIDGET_SIZES.MEDIUM,
						order: 80,
					},
				],
			},
		},
	},

	{
		id: MODULES.ANALYTICS,

		name: "Analytics",

		description:
			"Monitor business performance through analytics and reporting.",

		enabled: true,

		experimental: false,

		deprecated: false,

		capabilities: [CAPABILITIES.ANALYTICS, CAPABILITIES.REPORTING],

		metadata: {
			ui: {
				navigation: [
					{
						id: "analytics",
						section: "business",
						order: 60,
						icon: "chart-column",
						label: "Analytics",
					},
				],

				routes: [
					{
						name: "analytics",
						path: "/analytics",
					},
				],

				widgets: [
					{
						id: "business-performance",
						type: WIDGET_TYPES.CHART,
						title: "Business Performance",
						size: WIDGET_SIZES.LARGE,
						order: 90,
					},
					{
						id: "growth-metrics",
						type: WIDGET_TYPES.STAT,
						title: "Growth Metrics",
						size: WIDGET_SIZES.SMALL,
						order: 100,
					},
				],
			},
		},
	},

	{
		id: MODULES.MARKETPLACE,

		name: "Marketplace",

		description:
			"Manage marketplace visibility, customer engagement, and public business presence.",

		enabled: true,

		experimental: false,

		deprecated: false,

		capabilities: [
			CAPABILITIES.MARKETPLACE,

			CAPABILITIES.REVIEWS,

			CAPABILITIES.MESSAGING,
		],

		metadata: {
			ui: {
				navigation: [
					{
						id: "marketplace",
						section: "growth",
						order: 70,
						icon: "store",
						label: "Marketplace",
					},
				],

				routes: [
					{
						name: "marketplace",
						path: "/marketplace",
					},
				],

				widgets: [
					{
						id: "marketplace-visibility",
						type: WIDGET_TYPES.STAT,
						title: "Marketplace Visibility",
						size: WIDGET_SIZES.SMALL,
						order: 110,
					},
					{
						id: "featured-offers",
						type: WIDGET_TYPES.LIST,
						title: "Featured Offers",
						size: WIDGET_SIZES.MEDIUM,
						order: 120,
					},
				],
			},
		},
	},

	{
		id: MODULES.SETTINGS,

		name: "Settings",

		description:
			"Configure business preferences, integrations, notifications, and platform settings.",

		enabled: true,

		experimental: false,

		deprecated: false,

		capabilities: [CAPABILITIES.NOTIFICATIONS],

		metadata: {
			ui: {
				navigation: [
					{
						id: "settings",
						section: "system",
						order: 100,
						icon: "settings",
						label: "Settings",
					},
				],

				routes: [
					{
						name: "settings",
						path: "/settings",
					},
				],

				widgets: [
					{
						id: "business-profile",
						type: WIDGET_TYPES.SUMMARY,
						title: "Business Profile",
						size: WIDGET_SIZES.MEDIUM,
						order: 130,
					},
					{
						id: "system-health",
						type: WIDGET_TYPES.ALERT,
						title: "System Health",
						size: WIDGET_SIZES.SMALL,
						order: 140,
					},
				],
			},
		},
	},
];

export const moduleRegistry = createRegistry(modules);
