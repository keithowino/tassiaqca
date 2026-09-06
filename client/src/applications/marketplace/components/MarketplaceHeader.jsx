import { Link } from "react-router-dom";
import { SiteHeader } from "../../../shared/index.js";

const marketplaceLinks = [
	{
		to: "/marketplace",
		label: "Discover",
		end: true,
	},
	{
		to: "/marketplace/search",
		label: "Search",
	},
];

function MarketplaceActions() {
	return (
		<div className="flex items-center gap-3">
			<Link
				to="/login"
				className="text-sm font-medium text-slate-600 hover:text-slate-950"
			>
				Sign in
			</Link>

			<Link
				to="/register"
				className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
			>
				Join TassiaQCA
			</Link>
		</div>
	);
}

export default function MarketplaceHeader() {
	return (
		<SiteHeader
			brand="TassiaQCA Marketplace"
			brandHref="/marketplace"
			links={marketplaceLinks}
			actions={<MarketplaceActions />}
		/>
	);
}
