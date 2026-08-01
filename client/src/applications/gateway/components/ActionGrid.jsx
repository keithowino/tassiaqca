import { Link } from "react-router-dom";

const actions = [
	{
		title: "Explore Marketplace",

		description: "Browse businesses, products and services.",

		to: "/marketplace",
	},

	{
		title: "Grow Your Business",

		description: "Create and manage your business.",

		to: "/register",
	},

	{
		title: "Join Workspace",

		description: "Access a business you've been invited to.",

		to: "/login",
	},

	{
		title: "Sign In",

		description: "Continue to your existing workspace.",

		to: "/login",
	},
];

export default function ActionGrid() {
	return (
		<section className="px-8 py-16">
			<div className="grid gap-6 md:grid-cols-2">
				{actions.map((action) => (
					<Link
						key={action.title}
						to={action.to}
						className="rounded-lg border bg-white p-6 shadow-sm hover:shadow-md transition"
					>
						<h2 className="text-xl font-semibold">
							{action.title}
						</h2>

						<p className="mt-3 text-slate-600">
							{action.description}
						</p>
					</Link>
				))}
			</div>
		</section>
	);
}
