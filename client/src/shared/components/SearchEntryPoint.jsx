import { Link } from "react-router-dom";

export default function SearchEntryPoint() {
	return (
		<div className="rounded-2xl border border-slate-200 bg-white p-6">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h2 className="text-lg font-semibold text-slate-950">
						Looking for something specific?
					</h2>

					<p className="mt-1 text-sm text-slate-600">
						Search published offerings across the Marketplace.
					</p>
				</div>

				<Link
					to="/marketplace/search"
					className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
				>
					Search Marketplace
				</Link>
			</div>
		</div>
	);
}
