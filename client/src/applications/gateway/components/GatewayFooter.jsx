import { MapPin, Mail, Phone } from "lucide-react";

import { SiteFooter } from "../../../shared/index.js";
import { platform } from "../../../shared/index.js";

const columns = [
	{
		title: "Platform",
		links: [
			{
				label: "Home",
				to: "/",
			},
			{
				label: "Marketplace",
				to: "/marketplace",
			},
			{
				label: "Business OS",
				to: "/business",
			},
			{
				label: "Administration",
				to: "/admin",
			},
		],
	},
	{
		title: "Business",
		links: [
			{
				label: "Register",
				to: "/register",
			},
			{
				label: "Sign in",
				to: "/login",
			},
		],
	},
	{
		title: "Contact",
		content: (
			<div className="space-y-4">
				<div className="flex gap-3">
					<MapPin
						size={18}
						className="mt-0.5 shrink-0 text-slate-500"
					/>

					<span className="text-sm leading-6 text-slate-600">
						{platform.location.name}, {platform.location.city}
					</span>
				</div>

				<div className="flex gap-3">
					<Mail
						size={18}
						className="mt-0.5 shrink-0 text-slate-500"
					/>

					<span className="text-sm leading-6 text-slate-600">
						{platform.contact.email}
					</span>
				</div>

				<div className="flex gap-3">
					<Phone
						size={18}
						className="mt-0.5 shrink-0 text-slate-500"
					/>

					<span className="text-sm leading-6 text-slate-600">
						{platform.contact.phone}
					</span>
				</div>
			</div>
		),
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

export default function GatewayFooter() {
	return (
		<SiteFooter
			brand="TassiaQCA"
			description="Quiet Compound Assets — Community-centric e-commerce operating system connecting customers, businesses, and communities."
			columns={columns}
			bottomLinks={bottomLinks}
		/>
	);
}
