import { CAPABILITIES } from "./capability.constants.js";
import { CAPABILITY_CATEGORIES } from "./capabilityCategory.constants.js";
import { PLATFORM_DOMAINS } from "../domains/domain.constants.js";
import { createRegistry } from "../registry/index.js";

const capabilities = [
	/**
	 * Commerce
	 */
	{
		id: CAPABILITIES.PRODUCT_CATALOG,
		name: "Product Catalog",
		description: "Manage physical products offered by a business.",
		category: CAPABILITY_CATEGORIES.COMMERCE,
		owner: PLATFORM_DOMAINS.COMMERCE,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [],
		metadata: {},
	},

	{
		id: CAPABILITIES.PRODUCT_VARIANTS,
		name: "Product Variants",
		description: "Support multiple purchasable variants of a product.",
		category: CAPABILITY_CATEGORIES.COMMERCE,
		owner: PLATFORM_DOMAINS.COMMERCE,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [CAPABILITIES.PRODUCT_CATALOG],
		metadata: {},
	},

	{
		id: CAPABILITIES.CATEGORIES,
		name: "Categories",
		description: "Organize offerings into categories.",
		category: CAPABILITY_CATEGORIES.COMMERCE,
		owner: PLATFORM_DOMAINS.COMMERCE,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [],
		metadata: {},
	},

	{
		id: CAPABILITIES.INVENTORY,
		name: "Inventory",
		description: "Track stock levels and inventory movements.",
		category: CAPABILITY_CATEGORIES.COMMERCE,
		owner: PLATFORM_DOMAINS.COMMERCE,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [CAPABILITIES.PRODUCT_CATALOG],
		metadata: {},
	},

	{
		id: CAPABILITIES.SUPPLIERS,
		name: "Suppliers",
		description: "Manage supplier relationships.",
		category: CAPABILITY_CATEGORIES.COMMERCE,
		owner: PLATFORM_DOMAINS.COMMERCE,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [],
		metadata: {},
	},

	{
		id: CAPABILITIES.PURCHASING,
		name: "Purchasing",
		description: "Manage procurement and purchasing workflows.",
		category: CAPABILITY_CATEGORIES.COMMERCE,
		owner: PLATFORM_DOMAINS.COMMERCE,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [CAPABILITIES.SUPPLIERS],
		metadata: {},
	},

	{
		id: CAPABILITIES.PRICING,
		name: "Pricing",
		description: "Manage pricing rules and price lists.",
		category: CAPABILITY_CATEGORIES.COMMERCE,
		owner: PLATFORM_DOMAINS.COMMERCE,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [CAPABILITIES.PRODUCT_CATALOG],
		metadata: {},
	},

	{
		id: CAPABILITIES.PROMOTIONS,
		name: "Promotions",
		description: "Create discounts and promotional campaigns.",
		category: CAPABILITY_CATEGORIES.COMMERCE,
		owner: PLATFORM_DOMAINS.COMMERCE,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [CAPABILITIES.PRICING],
		metadata: {},
	},

	/**
	 * Services
	 */
	{
		id: CAPABILITIES.SERVICES,
		name: "Services",
		description: "Manage service offerings.",
		category: CAPABILITY_CATEGORIES.SERVICES,
		owner: PLATFORM_DOMAINS.COMMERCE,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [],
		metadata: {},
	},

	{
		id: CAPABILITIES.BOOKINGS,
		name: "Bookings",
		description: "Manage appointments and reservations.",
		category: CAPABILITY_CATEGORIES.SERVICES,
		owner: PLATFORM_DOMAINS.SCHEDULING,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [CAPABILITIES.SERVICES],
		metadata: {},
	},

	{
		id: CAPABILITIES.CALENDAR,
		name: "Calendar",
		description: "Manage schedules and availability.",
		category: CAPABILITY_CATEGORIES.SERVICES,
		owner: PLATFORM_DOMAINS.SCHEDULING,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [CAPABILITIES.BOOKINGS],
		metadata: {},
	},

	/**
	 * Customers
	 */
	{
		id: CAPABILITIES.CUSTOMERS,
		name: "Customers",
		description: "Manage customer records.",
		category: CAPABILITY_CATEGORIES.CUSTOMERS,
		owner: PLATFORM_DOMAINS.CUSTOMERS,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [],
		metadata: {},
	},

	{
		id: CAPABILITIES.CRM,
		name: "Customer Relationship Management",
		description: "Manage customer relationships and interactions.",
		category: CAPABILITY_CATEGORIES.CUSTOMERS,
		owner: PLATFORM_DOMAINS.CUSTOMERS,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [CAPABILITIES.CUSTOMERS],
		metadata: {},
	},

	{
		id: CAPABILITIES.REVIEWS,
		name: "Reviews",
		description: "Collect and manage customer reviews.",
		category: CAPABILITY_CATEGORIES.CUSTOMERS,
		owner: PLATFORM_DOMAINS.MARKETPLACE,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [CAPABILITIES.CUSTOMERS],
		metadata: {},
	},

	{
		id: CAPABILITIES.LOYALTY,
		name: "Loyalty",
		description: "Manage customer loyalty programs and rewards.",
		category: CAPABILITY_CATEGORIES.LOYALTY,
		owner: PLATFORM_DOMAINS.CUSTOMERS,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [CAPABILITIES.CUSTOMERS],
		metadata: {},
	},

	/**
	 * Finance
	 */
	{
		id: CAPABILITIES.PAYMENTS,
		name: "Payments",
		description: "Accept and manage customer payments.",
		category: CAPABILITY_CATEGORIES.PAYMENTS,
		owner: PLATFORM_DOMAINS.FINANCE,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [],
		metadata: {},
	},

	{
		id: CAPABILITIES.FINANCE,
		name: "Finance",
		description: "Manage financial operations and accounting.",
		category: CAPABILITY_CATEGORIES.FINANCE,
		owner: PLATFORM_DOMAINS.FINANCE,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [CAPABILITIES.PAYMENTS],
		metadata: {},
	},

	{
		id: CAPABILITIES.BILLING,
		name: "Billing",
		description: "Generate invoices and manage billing workflows.",
		category: CAPABILITY_CATEGORIES.FINANCE,
		owner: PLATFORM_DOMAINS.FINANCE,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [CAPABILITIES.FINANCE],
		metadata: {},
	},

	/**
	 * Operations
	 */
	{
		id: CAPABILITIES.STAFF,
		name: "Staff",
		description: "Manage staff members and internal teams.",
		category: CAPABILITY_CATEGORIES.OPERATIONS,
		owner: PLATFORM_DOMAINS.BUSINESS,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [],
		metadata: {},
	},

	{
		id: CAPABILITIES.DELIVERY,
		name: "Delivery",
		description: "Manage delivery operations and fulfilment.",
		category: CAPABILITY_CATEGORIES.OPERATIONS,
		owner: PLATFORM_DOMAINS.LOGISTICS,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [],
		metadata: {},
	},

	/**
	 * Analytics
	 */
	{
		id: CAPABILITIES.ANALYTICS,
		name: "Analytics",
		description: "Monitor business performance through analytics.",
		category: CAPABILITY_CATEGORIES.ANALYTICS,
		owner: PLATFORM_DOMAINS.ANALYTICS,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [],
		metadata: {},
	},

	{
		id: CAPABILITIES.REPORTING,
		name: "Reporting",
		description: "Generate operational and financial reports.",
		category: CAPABILITY_CATEGORIES.ANALYTICS,
		owner: PLATFORM_DOMAINS.ANALYTICS,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [CAPABILITIES.ANALYTICS],
		metadata: {},
	},

	/**
	 * Communication
	 */
	{
		id: CAPABILITIES.NOTIFICATIONS,
		name: "Notifications",
		description: "Deliver platform and business notifications.",
		category: CAPABILITY_CATEGORIES.COMMUNICATION,
		owner: PLATFORM_DOMAINS.COMMUNICATION,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [],
		metadata: {},
	},

	{
		id: CAPABILITIES.MESSAGING,
		name: "Messaging",
		description: "Support direct messaging between platform users.",
		category: CAPABILITY_CATEGORIES.COMMUNICATION,
		owner: PLATFORM_DOMAINS.COMMUNICATION,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [CAPABILITIES.NOTIFICATIONS],
		metadata: {},
	},

	/**
	 * Marketplace
	 */
	{
		id: CAPABILITIES.MARKETPLACE,
		name: "Marketplace",
		description: "Expose offerings through the public marketplace.",
		category: CAPABILITY_CATEGORIES.MARKETPLACE,
		owner: PLATFORM_DOMAINS.MARKETPLACE,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [],
		metadata: {},
	},

	/**
	 * Membership
	 */
	{
		id: CAPABILITIES.SUBSCRIPTIONS,
		name: "Subscriptions",
		description: "Manage recurring subscriptions for offerings.",
		category: CAPABILITY_CATEGORIES.SUBSCRIPTIONS,
		owner: PLATFORM_DOMAINS.COMMERCE,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [],
		metadata: {},
	},

	{
		id: CAPABILITIES.MEMBERSHIPS,
		name: "Memberships",
		description: "Manage customer and organization memberships.",
		category: CAPABILITY_CATEGORIES.SUBSCRIPTIONS,
		owner: PLATFORM_DOMAINS.COMMERCE,
		enabled: true,
		experimental: false,
		deprecated: false,
		dependencies: [CAPABILITIES.SUBSCRIPTIONS],
		metadata: {},
	},
];

export const capabilityRegistry = createRegistry(capabilities);
