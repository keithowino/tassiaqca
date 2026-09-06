import { Link } from "react-router-dom";
import { SiteHeader } from "../../../shared/index.js";

const gatewayLinks = [
	{
		to: "/",
		label: "Home",
		end: true,
	},
	{
		to: "/marketplace",
		label: "Marketplace",
	},
];

function GatewayActions() {
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
				Get started
			</Link>
		</div>
	);
}

export default function GatewayHeader() {
	return (
		<SiteHeader
			brand="TassiaQCA"
			brandHref="/"
			links={gatewayLinks}
			actions={<GatewayActions />}
		/>
	);
}
