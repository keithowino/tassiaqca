import { Link } from "react-router-dom";

export default function BusinessCard({ business }) {
	return (
		<Link
			to={`/marketplace/businesses/${encodeURIComponent(business.slug)}`}
			className="block"
		>
			<article className="h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
				<div className="flex items-start justify-between gap-4">
					<p className="text-xs font-medium uppercase tracking-wide text-slate-500">
						{business.businessType}
					</p>

					{business.verified && (
						<span className="text-xs font-medium text-slate-600">
							Verified
						</span>
					)}
				</div>

				<h3 className="mt-2 text-lg font-semibold text-slate-950">
					{business.name}
				</h3>

				{business.description && (
					<p className="mt-2 text-sm leading-6 text-slate-600">
						{business.description}
					</p>
				)}

				<p className="mt-4 text-sm font-medium text-slate-700">
					View business
				</p>
			</article>
		</Link>
	);
}
