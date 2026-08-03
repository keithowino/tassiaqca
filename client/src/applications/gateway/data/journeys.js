import { PlatformIntent } from "../../../platform/journey";

const journeys = [
	{
		id: "discover",
		title: "Explore the Marketplace",
		description:
			"Browse businesses, products, services, and communities around you.",
		action: "Explore",
		intent: PlatformIntent.MARKETPLACE,
	},

	{
		id: "business",
		title: "Start a Business",
		description:
			"Create your business workspace and begin operating online.",
		action: "Get Started",
		intent: PlatformIntent.START_BUSINESS,
	},

	{
		id: "workspace",
		title: "Join a Workspace",
		description:
			"Accept an invitation and collaborate with your organization.",
		action: "Join",
		intent: PlatformIntent.JOIN_BUSINESS,
	},

	{
		id: "signin",
		title: "Sign In",
		description:
			"Access your Marketplace, Business OS, or Administration workspace.",
		action: "Sign In",
		intent: PlatformIntent.MARKETPLACE,
	},
];

export default journeys;
