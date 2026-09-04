import { JourneyLink } from "../../platform/index.js";
import { Button } from "../index.js";

export default function LoadEmptyResponse({
	message = "No data available.",
	intent,
	actionLabel,
}) {
	return (
		<div className="text-center py-8 bg-white rounded-2xl border border-gray-100">
			<p className="text-gray-500">{message}</p>
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
	);
}
