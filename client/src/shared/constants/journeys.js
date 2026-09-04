import { PlatformIntents } from "../../platform/index.js";

const journeys = [
	{
		id: "discover",
		title: "Explore the Marketplace",
		description:
			"Browse businesses, products, services, and communities around you.",
		action: "Explore",
		intent: PlatformIntents.intent.MARKETPLACE,
	},

	{
		id: "business",
		title: "Start a Business",
		description:
			"Create your business workspace and begin operating online.",
		action: "Get Started",
		intent: PlatformIntents.intent.START_BUSINESS,
	},

	{
		id: "workspace",
		title: "Join a Workspace",
		description:
			"Accept an invitation and collaborate with your organization.",
		action: "Join",
		intent: PlatformIntents.intent.JOIN_BUSINESS,
	},

	{
		id: "signin",
		title: "Sign In",
		description:
			"Access your Marketplace, Business OS, or Administration workspace.",
		action: "Sign In",
		intent: PlatformIntents.intent.MARKETPLACE,
	},
];

export default journeys;
