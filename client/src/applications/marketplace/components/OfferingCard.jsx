// export default function OfferingCard({ offering }) {
// 	return (
// 		<article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
// 			<p className="text-xs font-medium uppercase tracking-wide text-slate-500">
// 				{offering.type}
// 			</p>

// 			<h3 className="mt-2 text-lg font-semibold text-slate-950">
// 				{offering.name}
// 			</h3>

// 			{offering.shortDescription && (
// 				<p className="mt-2 text-sm leading-6 text-slate-600">
// 					{offering.shortDescription}
// 				</p>
// 			)}
// 		</article>
// 	);
// }

import { Link } from "react-router-dom";

export default function OfferingCard({ offering }) {
	return (
		<Link
			to={`/marketplace/offerings/${encodeURIComponent(offering.slug)}`}
			className="block"
		>
			<article className="h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
				<p className="text-xs font-medium uppercase tracking-wide text-slate-500">
					{offering.type}
				</p>

				<h3 className="mt-2 text-lg font-semibold text-slate-950">
					{offering.name}
				</h3>

				{offering.shortDescription && (
					<p className="mt-2 text-sm leading-6 text-slate-600">
						{offering.shortDescription}
					</p>
				)}

				<p className="mt-4 text-sm font-medium text-slate-700">
					View offering
				</p>
			</article>
		</Link>
	);
}
