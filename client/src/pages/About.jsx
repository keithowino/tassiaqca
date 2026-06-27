import {
	MapPin,
	Users,
	ShoppingBag,
	Star,
	Shield,
	Award,
	Heart,
	Target,
} from "lucide-react";
import MetaDataInsert from "../lib/MetaDataInsert";
import { Link } from "react-router-dom";
import data from "../lib/data";

export default function About() {
	const { metadata } = data;

	const stats = [
		{ icon: Users, label: "Community Members", value: "500+" },
		{ icon: ShoppingBag, label: "Orders Placed", value: "1,000+" },
		{ icon: Star, label: "Businesses Listed", value: "50+" },
		{ icon: Heart, label: "Happy Customers", value: "98%" },
	];

	const values = [
		{
			icon: Shield,
			title: "Trust & Transparency",
			description:
				"We believe in building a community based on trust. Every business is verified, and every review is authentic.",
		},
		{
			icon: Target,
			title: "Local First",
			description:
				"We're committed to empowering local businesses in Tassia Complex and helping residents discover what's in their neighborhood.",
		},
		{
			icon: Users,
			title: "Community Driven",
			description:
				"Our platform is shaped by the community. We listen, adapt, and grow together with our users.",
		},
	];

	return (
		<>
			<MetaDataInsert
				title="About"
				description={`Learn about ${metadata.name} - ${metadata.tagline} . ${metadata.description} `}
			/>

			<div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
				{/* Hero Section */}
				<div className="text-center mb-12">
					<h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
						About{" "}
						<span className="text-orange-500">{metadata.name}</span>
					</h1>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						{metadata.tagline} — Connecting Tassia Complex, one
						community at a time.
					</p>
				</div>

				{/* Mission Statement */}
				<div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-3xl p-6 md:p-8 mb-12">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">
						Our Mission
					</h2>
					<p className="text-gray-700 leading-relaxed text-base md:text-lg">
						{metadata.name} exists to bridge the gap between local
						businesses and residents in Tassia Complex. We believe
						that when local commerce thrives, communities flourish.
						Our platform empowers business owners to grow their
						digital presence while helping residents discover,
						support, and connect with the incredible businesses
						right in their neighborhood.
					</p>
				</div>

				{/* Stats */}
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

				{/* What is TassiaQCA */}
				<div className="mb-12">
					<h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
						What is {metadata.name}?
					</h2>
					<div className="grid md:grid-cols-2 gap-6">
						<div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
							<h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
								<span className="text-orange-500">🏪</span> For
								Businesses
							</h3>
							<ul className="space-y-2 text-gray-600 text-sm">
								<li>• List your products and services</li>
								<li>• Manage orders and inventory</li>
								<li>• Connect with customers directly</li>
								<li>• Grow your online presence</li>
							</ul>
						</div>
						<div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
							<h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
								<span className="text-orange-500">👥</span> For
								Residents
							</h3>
							<ul className="space-y-2 text-gray-600 text-sm">
								<li>• Discover local businesses</li>
								<li>• Order food and services</li>
								<li>• Read and write reviews</li>
								<li>• Join the community board</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Our Values */}
				<div className="mb-12">
					<h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
						Our Values
					</h2>
					<div className="grid md:grid-cols-3 gap-6">
						{values.map((value) => (
							<div
								key={value.title}
								className="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm hover:shadow-md transition-shadow"
							>
								<value.icon className="w-12 h-12 text-orange-500 mx-auto mb-3" />
								<h3 className="font-semibold text-gray-900 mb-2">
									{value.title}
								</h3>
								<p className="text-sm text-gray-600">
									{value.description}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* CTA */}
				<div className="bg-gray-900 rounded-3xl p-8 text-center text-white">
					<h2 className="text-2xl font-bold mb-4">
						Ready to Join the Community?
					</h2>
					<p className="text-gray-300 mb-6 max-w-xl mx-auto">
						Whether you're a business owner or a resident,{" "}
						{metadata.name} is here to help you connect and grow.
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<Link
							to="/dashboard/new"
							className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors"
						>
							List Your Business
						</Link>
						<Link
							to="/discover"
							className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
						>
							Discover Businesses
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
