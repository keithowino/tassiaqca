import { JourneyLink } from "../../platform/index.js";
import { Button } from "../index.js";

export default function LoadExperience({
	title = "Continue exploring",
	message = "Grasp on the first opportunity.",
	intent,
	actionLabel,
}) {
	return (
		<div className="rounded-2xl border border-slate-200 bg-white p-6">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h2 className="text-lg font-semibold text-slate-950">
						{title}
					</h2>
					<p className="mt-1 text-sm text-slate-600">{message}</p>
				</div>

				{intent && (
					<Button
						as={JourneyLink}
						intent={intent}
						className="mt-3 inline-block bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-orange-600 transition-colors"
					>
						{actionLabel || "Take Action"}
					</Button>
				)}
			</div>
		</div>
	);
}
