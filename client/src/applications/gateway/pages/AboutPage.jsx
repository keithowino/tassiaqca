import { Heart, Shield, ShoppingBag, Star, Target, Users } from "lucide-react";

import { Link } from "react-router-dom";

import platform from "../../../shared/config/platform.config";
import {
	PageSection,
	SectionHeader,
	SeedHeader,
} from "../../../shared/index.js";

const values = [
	{
		icon: Shield,
		title: "Trust & Transparency",
		description:
			"We believe in building a community based on trust, transparency, and reliable interactions between businesses and customers.",
	},
	{
		icon: Target,
		title: "Local First",
		description:
			"We're committed to empowering local businesses and helping residents discover what is available within their community.",
	},
	{
		icon: Users,
		title: "Community Driven",
		description:
			"Our platform is shaped by the community. We listen, adapt, and grow together with the people and businesses we serve.",
	},
];

const stats = [
	{ icon: Users, label: "Community Members", value: "500+" },
	{ icon: ShoppingBag, label: "Orders Placed", value: "1,000+" },
	{ icon: Star, label: "Businesses Listed", value: "50+" },
	{ icon: Heart, label: "Happy Customers", value: "98%" },
];

const businessFeatures = [
	"Present your business and offerings",
	"Manage your business operations",
	"Connect with customers",
	"Grow your digital presence",
];

const customerFeatures = [
	"Discover local businesses",
	"Explore products and services",
	"Connect with businesses",
	"Participate in the community",
];

/**
 * This intentionally remains modest. We should later replace the copy with the actual approved public-facing About content.
 */
export default function AboutPage() {
	const platformName = platform?.name || "TassiaQCA";
	const tagline =
		platform?.tagline || "Community-centric commerce operating system";

	return (
		<div>
			<SeedHeader
				badgeText={`About ${platformName}`}
				description={`${tagline} — connecting businesses, customers, and
							communities through one shared digital ecosystem.`}
				headBack={true}
				to="/"
				title="Building a community-centric commerce platform."
			>
				Gateway
			</SeedHeader>

			<PageSection>
				<div className="rounded-3xl bg-gradient-to-r from-orange-50 to-amber-50 p-6 sm:p-8">
					<div className="mx-auto max-w-4xl">
						<h2 className="text-2xl font-bold tracking-tight text-slate-950">
							Our Mission
						</h2>

						<p className="mt-4 text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
							{platformName} exists to bridge the gap between
							local businesses and the communities they serve. We
							believe that when local commerce thrives,
							communities flourish.
						</p>

						<p className="mt-4 text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
							Our platform is designed to empower businesses with
							the digital tools they need to operate and grow,
							while giving customers a simple way to discover and
							connect with businesses and their offerings.
						</p>
					</div>
				</div>
			</PageSection>

			<PageSection>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
					{stats.map((stat) => (
						<div
							key={stat.label}
							className="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm hover:shadow-md transition-shadow"
						>
							<stat.icon className="w-8 h-8 text-orange-500 mx-auto mb-2" />
							<p className="text-2xl font-bold text-gray-900">
								{stat.value}
							</p>
							<p className="text-sm text-gray-500">
								{stat.label}
							</p>
						</div>
					))}
				</div>
			</PageSection>

			<PageSection>
				<SectionHeader
					title={`What is ${platformName}?`}
					description={`${platformName} brings together public discovery,
							marketplace experiences, and business operations
							within one extensible platform.`}
				/>

				<div className="mt-8 grid gap-6 md:grid-cols-2">
					<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-xl">
								🏪
							</div>

							<h3 className="font-semibold text-slate-950">
								For Businesses
							</h3>
						</div>

						<ul className="mt-5 space-y-3 text-sm text-slate-600">
							{businessFeatures.map((feature) => (
								<li key={feature} className="flex gap-2">
									<span className="text-orange-500">•</span>

									<span>{feature}</span>
								</li>
							))}
						</ul>

						<Link
							to="/register"
							className="mt-6 inline-flex text-sm font-semibold text-orange-500 hover:text-orange-600"
						>
							Register your business →
						</Link>
					</div>

					<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-xl">
								👥
							</div>

							<h3 className="font-semibold text-slate-950">
								For Customers
							</h3>
						</div>

						<ul className="mt-5 space-y-3 text-sm text-slate-600">
							{customerFeatures.map((feature) => (
								<li key={feature} className="flex gap-2">
									<span className="text-orange-500">•</span>

									<span>{feature}</span>
								</li>
							))}
						</ul>

						<Link
							to="/marketplace"
							className="mt-6 inline-flex text-sm font-semibold text-orange-500 hover:text-orange-600"
						>
							Explore the Marketplace →
						</Link>
					</div>
				</div>
			</PageSection>

			<PageSection>
				<SectionHeader
					title="Our Values"
					description="The principles that guide how we build and evolve the
						platform."
				/>

				<div className="mt-8 grid gap-6 md:grid-cols-3">
					{values.map((value) => {
						const Icon = value.icon;

						return (
							<div
								key={value.title}
								className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
							>
								<Icon
									className="mx-auto h-12 w-12 text-orange-500"
									strokeWidth={1.75}
								/>

								<h3 className="mt-4 font-semibold text-slate-950">
									{value.title}
								</h3>

								<p className="mt-3 text-sm leading-6 text-slate-600">
									{value.description}
								</p>
							</div>
						);
					})}
				</div>
			</PageSection>

			<PageSection>
				<div className="rounded-3xl bg-slate-900 p-8 text-center text-white sm:p-12">
					<SectionHeader
						title="Ready to Join the Community?"
						description={`Whether you're discovering local businesses or building
						one, ${platformName} is here to help you connect,
						operate, and grow.`}
						descriptionClassName="text-gray-200"
					/>

					<div className="mt-7 flex flex-wrap justify-center gap-4">
						<Link
							to="/register"
							className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
						>
							List Your Business
						</Link>

						<Link
							to="/marketplace"
							className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
						>
							Discover Businesses
						</Link>
					</div>
				</div>
			</PageSection>
		</div>
	);
}
