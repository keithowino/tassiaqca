Here is a portion of the previously implemented Gateway footer:

```jsx
`~\client\src\applications\gateway\components\FooterSection.jsx`;

// ...

import { MapPin, Mail, Phone } from "lucide-react";

// ...

import platform from "../../../shared/config/platform.config";

import { Container } from "../../../shared/ui";

export default function FooterSection() {
	// ...

	return (
		<footer className="bg-gray-900 text-white">
			<Container className="py-14">
				<div className="grid gap-10 lg:grid-cols-4">
					{/*...*/}

					<div>
						<h3 className="font-semibold mb-4">Contact</h3>

						<div className="space-y-4">
							<div className="flex gap-3">
								<MapPin size={18} />
								<span>
									{platform.location.name},{" "}
									{platform.location.city}
								</span>
							</div>

							<div className="flex gap-3">
								<Mail size={18} />
								<span>{platform.contact.email}</span>
							</div>

							<div className="flex gap-3">
								<Phone size={18} />
								<span>{platform.contact.phone}</span>
							</div>
						</div>
					</div>
				</div>

				{/*...*/}
			</Container>
		</footer>
	);
}
```

Let's adopt the Contact column to the current version(s) of the footer. Here are the current states of the following files:

```jsx
`~\client\src\shared\layout\SiteFooter\SiteFooter.jsx`;

import { Link } from "react-router-dom";

import {
	IoLogoFacebook,
	IoLogoGithub,
	IoLogoInstagram,
	IoLogoTwitter,
} from "react-icons/io5";

import { Container } from "../../ui/index.js";
import { MainLogo } from "../../components/LoadLogo.jsx";

export default function SiteFooter({
	brand = "TassiaQCA",
	description = "",
	columns = [],
	bottomLinks = [],
	copyright,
	className = "",
}) {
	return (
		<footer
			className={["border-t border-slate-200 bg-white", className].join(
				" ",
			)}
		>
			<Container className="py-12 sm:px-6 lg:px-8">
				<div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
					<div>
						<div className="mb-4">
							<MainLogo
								iconPD="10"
								iconD="9"
								text={{
									size: "text-2xl",
									color: "text-slate-950",
								}}
								bg="light"
							/>
						</div>

						{description && (
							<p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
								{description}
							</p>
						)}

						<div className="flex gap-4 mt-6">
							{[
								IoLogoTwitter,
								IoLogoInstagram,
								IoLogoFacebook,
								IoLogoGithub,
							].map((Icon, index) => (
								<a
									key={index}
									href="#"
									className="text-gray-400 hover:text-orange-500"
								>
									<Icon size={20} />
								</a>
							))}
						</div>
					</div>

					{columns.length > 0 && (
						<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
							{columns.map((column) => (
								<div key={column.title}>
									<h2 className="text-sm font-semibold text-slate-950">
										{column.title}
									</h2>

									<ul className="mt-4 space-y-3">
										{(column.links || []).map((link) => (
											<li key={link.to}>
												<Link
													to={link.to}
													className="text-sm text-slate-600 transition-colors hover:text-slate-950"
												>
													{link.label}
												</Link>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					)}
				</div>

				<div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
					<p className="text-xs text-slate-500">
						{copyright ||
							`© ${new Date().getFullYear()} ${brand}. All rights reserved.`}
					</p>

					{bottomLinks.length > 0 && (
						<nav className="flex flex-wrap gap-x-5 gap-y-2">
							{bottomLinks.map((link) => (
								<Link
									key={link.to}
									to={link.to}
									className="text-xs text-slate-500 hover:text-slate-900"
								>
									{link.label}
								</Link>
							))}
						</nav>
					)}
				</div>
			</Container>
		</footer>
	);
}
```

```jsx
`~\client\src\shared\components\LoadLogo.jsx`;

import { Link } from "react-router-dom";

export const MainLogo = ({ iconPD, iconD, text, bg, ref }) => {
	return (
		<Link to={ref} className="flex items-center gap-2 shrink-0">
			<div
				className={`w-${iconPD} h-${iconPD} flex items-center justify-center`}
			>
				<img
					src={`${bg === "dark" ? "/favicon.svg" : "/favicon-32x32.png"}`}
					alt="TassiaQCA"
					className={`w-${iconD} h-${iconD} ${bg === "light" ? "bg-black" : ""} rounded-full`}
				/>
			</div>
			<span
				className={`font-bold ${text.size} ${bg === "dark" ? "text-white" : text.color}  tracking-tight`}
			>
				Tassia<span className="text-orange-500">QCA</span>
			</span>
		</Link>
	);
};
```

```jsx
`~\client\src\applications\gateway\components\GatewayFooter.jsx`;

import { SiteFooter } from "../../../shared/index.js";

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
		// ...
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
```

While on that, let's create the foundation for these pages About, Privacy and Terms.
