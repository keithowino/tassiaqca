import mongoose from "mongoose";
import dotenv from "dotenv";
import BusinessType from "../models/BusinessType.js";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env.development") });
// dotenv.config({ path: path.join(process.cwd(), ".env.production") });

const businessTypes = [
	{
		code: "retail",
		name: "Retail Store",
		description:
			"Selling physical goods including electronics, furniture, hardware, fashion, and groceries.",
		icon: "Store",
		config: {
			hasInventory: true,
			hasProducts: true,
			hasDelivery: true,
			hasServices: false,
			hasAppointments: false,
			hasBookings: false,
			hasQuotations: false,
			hasStaff: false,
			hasCalendar: false,
			hasKitchen: false,
			hasRentals: false,
			hasSubscriptions: false,
			hasPortfolio: false,
			hasDispatch: false,
			hasListings: false,
		},
		modules: {
			commerce: ["products", "inventory", "orders"],
			operations: ["delivery"],
		},
		paymentModels: ["one_time", "installment"],
		deliveryOptions: ["pickup", "local_delivery", "shipping"],
		sortOrder: 1,
	},
	{
		code: "food",
		name: "Food & Restaurant",
		description:
			"Preparing and selling food and beverages including restaurants, cafes, bakeries, and butcheries.",
		icon: "UtensilsCrossed",
		config: {
			hasInventory: false,
			hasProducts: false,
			hasDelivery: true,
			hasServices: false,
			hasAppointments: false,
			hasBookings: true,
			hasQuotations: false,
			hasStaff: true,
			hasCalendar: false,
			hasKitchen: true,
			hasRentals: false,
			hasSubscriptions: false,
			hasPortfolio: false,
			hasDispatch: false,
			hasListings: false,
		},
		modules: {
			commerce: ["menu", "orders", "reservations"],
			operations: ["kitchen", "staff"],
		},
		paymentModels: ["one_time"],
		deliveryOptions: ["pickup", "local_delivery"],
		sortOrder: 2,
	},
	{
		code: "professional",
		name: "Professional Services",
		description:
			"Knowledge-based services including legal, financial, consulting, and architectural services.",
		icon: "Briefcase",
		config: {
			hasInventory: false,
			hasProducts: false,
			hasDelivery: false,
			hasServices: true,
			hasAppointments: true,
			hasBookings: false,
			hasQuotations: true,
			hasStaff: true,
			hasCalendar: true,
			hasKitchen: false,
			hasRentals: false,
			hasSubscriptions: true,
			hasPortfolio: true,
			hasDispatch: false,
			hasListings: false,
		},
		modules: {
			commerce: ["services", "quotations"],
			operations: ["appointments", "staff", "calendar"],
		},
		paymentModels: ["hourly", "subscription", "quote_based"],
		deliveryOptions: ["online", "on_site"],
		sortOrder: 3,
	},
	{
		code: "trade",
		name: "Skilled Trades",
		description:
			"Hands-on technical services including electrical, plumbing, construction, and mechanical work.",
		icon: "Wrench",
		config: {
			hasInventory: false,
			hasProducts: false,
			hasDelivery: false,
			hasServices: true,
			hasAppointments: false,
			hasBookings: true,
			hasQuotations: true,
			hasStaff: true,
			hasCalendar: false,
			hasKitchen: false,
			hasRentals: false,
			hasSubscriptions: false,
			hasPortfolio: true,
			hasDispatch: false,
			hasListings: false,
		},
		modules: {
			commerce: ["services", "quotations"],
			operations: ["bookings", "staff"],
		},
		paymentModels: ["hourly", "quote_based"],
		deliveryOptions: ["on_site"],
		sortOrder: 4,
	},
	{
		code: "health",
		name: "Health & Wellness",
		description:
			"Medical and health services including clinics, pharmacies, and laboratories.",
		icon: "Stethoscope",
		config: {
			hasInventory: false,
			hasProducts: false,
			hasDelivery: false,
			hasServices: true,
			hasAppointments: true,
			hasBookings: false,
			hasQuotations: false,
			hasStaff: true,
			hasCalendar: true,
			hasKitchen: false,
			hasRentals: false,
			hasSubscriptions: false,
			hasPortfolio: false,
			hasDispatch: false,
			hasListings: false,
		},
		modules: {
			commerce: ["services"],
			operations: ["appointments", "staff", "calendar", "patients"],
		},
		paymentModels: ["one_time", "installment"],
		deliveryOptions: ["on_site"],
		sortOrder: 5,
	},
	{
		code: "beauty",
		name: "Beauty & Personal Care",
		description:
			"Grooming and beauty services including salons, barbers, and spas.",
		icon: "Scissors",
		config: {
			hasInventory: false,
			hasProducts: false,
			hasDelivery: false,
			hasServices: true,
			hasAppointments: true,
			hasBookings: false,
			hasQuotations: false,
			hasStaff: true,
			hasCalendar: true,
			hasKitchen: false,
			hasRentals: false,
			hasSubscriptions: true,
			hasPortfolio: true,
			hasDispatch: false,
			hasListings: false,
		},
		modules: {
			commerce: ["services", "portfolio"],
			operations: ["appointments", "staff", "calendar"],
		},
		paymentModels: ["one_time", "subscription"],
		deliveryOptions: ["on_site"],
		sortOrder: 6,
	},
	{
		code: "education",
		name: "Education & Training",
		description:
			"Tutoring, training, and instruction services including tuition centers and driving schools.",
		icon: "BookOpen",
		config: {
			hasInventory: false,
			hasProducts: false,
			hasDelivery: false,
			hasServices: true,
			hasAppointments: false,
			hasBookings: true,
			hasQuotations: false,
			hasStaff: true,
			hasCalendar: true,
			hasKitchen: false,
			hasRentals: false,
			hasSubscriptions: true,
			hasPortfolio: false,
			hasDispatch: false,
			hasListings: false,
		},
		modules: {
			commerce: ["programs", "courses"],
			operations: ["schedule", "staff", "students"],
		},
		paymentModels: ["one_time", "subscription", "installment"],
		deliveryOptions: ["on_site", "online"],
		sortOrder: 7,
	},
	{
		code: "property",
		name: "Property & Real Estate",
		description: "Property sales, rentals, and management services.",
		icon: "Home",
		config: {
			hasInventory: false,
			hasProducts: false,
			hasDelivery: false,
			hasServices: false,
			hasAppointments: false,
			hasBookings: false,
			hasQuotations: false,
			hasStaff: true,
			hasCalendar: false,
			hasKitchen: false,
			hasRentals: true,
			hasSubscriptions: false,
			hasPortfolio: true,
			hasDispatch: false,
			hasListings: true,
		},
		modules: {
			commerce: ["listings", "rentals"],
			operations: ["staff", "inquiries"],
		},
		paymentModels: ["one_time", "installment"],
		deliveryOptions: ["on_site"],
		sortOrder: 8,
	},
	{
		code: "logistics",
		name: "Logistics & Delivery",
		description:
			"Transportation and delivery services including couriers and delivery services.",
		icon: "Truck",
		config: {
			hasInventory: false,
			hasProducts: false,
			hasDelivery: true,
			hasServices: false,
			hasAppointments: false,
			hasBookings: true,
			hasQuotations: false,
			hasStaff: true,
			hasCalendar: false,
			hasKitchen: false,
			hasRentals: false,
			hasSubscriptions: false,
			hasPortfolio: false,
			hasDispatch: true,
			hasListings: false,
		},
		modules: {
			commerce: ["orders"],
			operations: ["dispatch", "staff", "deliveries"],
		},
		paymentModels: ["one_time"],
		deliveryOptions: ["local_delivery"],
		sortOrder: 9,
	},
	{
		code: "agriculture",
		name: "Agriculture & Farming",
		description:
			"Farming, produce, and livestock businesses including poultry, dairy, and fresh produce.",
		icon: "Sprout",
		config: {
			hasInventory: true,
			hasProducts: true,
			hasDelivery: true,
			hasServices: false,
			hasAppointments: false,
			hasBookings: false,
			hasQuotations: false,
			hasStaff: false,
			hasCalendar: false,
			hasKitchen: false,
			hasRentals: false,
			hasSubscriptions: true,
			hasPortfolio: false,
			hasDispatch: false,
			hasListings: false,
		},
		modules: {
			commerce: ["products", "inventory"],
			operations: [],
		},
		paymentModels: ["one_time", "subscription"],
		deliveryOptions: ["local_delivery"],
		sortOrder: 10,
	},
	{
		code: "manufacturing",
		name: "Manufacturing",
		description:
			"Production of goods including bakeries, tailors, and fabrication.",
		icon: "Factory",
		config: {
			hasInventory: true,
			hasProducts: true,
			hasDelivery: false,
			hasServices: false,
			hasAppointments: false,
			hasBookings: true,
			hasQuotations: true,
			hasStaff: true,
			hasCalendar: false,
			hasKitchen: false,
			hasRentals: false,
			hasSubscriptions: false,
			hasPortfolio: false,
			hasDispatch: false,
			hasListings: false,
		},
		modules: {
			commerce: ["products", "inventory", "quotations"],
			operations: ["staff"],
		},
		paymentModels: ["one_time", "quote_based"],
		deliveryOptions: ["pickup"],
		sortOrder: 11,
	},
	{
		code: "digital",
		name: "Digital Services",
		description:
			"Online and digital services including software development, design, and digital marketing.",
		icon: "Laptop",
		config: {
			hasInventory: false,
			hasProducts: false,
			hasDelivery: false,
			hasServices: true,
			hasAppointments: true,
			hasBookings: false,
			hasQuotations: true,
			hasStaff: true,
			hasCalendar: true,
			hasKitchen: false,
			hasRentals: false,
			hasSubscriptions: true,
			hasPortfolio: true,
			hasDispatch: false,
			hasListings: false,
		},
		modules: {
			commerce: ["services", "quotations", "subscriptions"],
			operations: ["appointments", "staff", "calendar"],
		},
		paymentModels: ["hourly", "subscription", "quote_based"],
		deliveryOptions: ["online"],
		sortOrder: 12,
	},
];

async function seedBusinessTypes() {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("✅ Connected to MongoDB");

		// Clear existing business types
		await BusinessType.deleteMany({});
		console.log("🧹 Cleared existing business types");

		// Insert new business types
		const result = await BusinessType.insertMany(businessTypes);
		console.log(`✅ Inserted ${result.length} business types`);

		// List all business types
		const types = await BusinessType.find().sort({ sortOrder: 1 });
		console.log("\n📋 Business Types in database:");
		types.forEach((type) => {
			console.log(`   - ${type.name} (${type.code})`);
		});

		await mongoose.disconnect();
		console.log("\n✅ Seeding complete!");
	} catch (error) {
		console.error("❌ Error seeding business types:", error);
		process.exit(1);
	}
}

seedBusinessTypes();
