import { SiteFooter } from "../../../shared/index.js";

const columns = [
	{
		title: "Marketplace",
		links: [
			{
				label: "Discover",
				to: "/marketplace",
			},
			{
				label: "Search",
				to: "/marketplace/search",
			},
		],
	},
	{
		title: "TassiaQCA",
		links: [
			{
				label: "Home",
				to: "/",
			},
			{
				label: "Business",
				to: "/register",
			},
		],
	},
	{
		title: "Account",
		links: [
			{
				label: "Sign in",
				to: "/login",
			},
			{
				label: "Create account",
				to: "/register",
			},
		],
	},
];

const bottomLinks = [
	{
		label: "About",
		to: "/about",
	},
	{
		label: "Privacy",
		to: "/privacy",
	},
	{
		label: "Terms",
		to: "/terms",
	},
];

export default function MarketplaceFooter() {
	return (
		<SiteFooter
			brand="TassiaQCA Marketplace"
			description="Discover businesses and offerings across the TassiaQCA community."
			columns={columns}
			bottomLinks={bottomLinks}
		/>
	);
}
