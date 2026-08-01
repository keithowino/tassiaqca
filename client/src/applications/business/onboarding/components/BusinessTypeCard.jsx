import { CheckCircle2 } from "lucide-react";

import { businessTypeIcons } from "../../../../shared/icons/businessTypeIcons";

export default function BusinessTypeCard({
	businessType,
	selected = false,
	onSelect,
}) {
	const Icon = businessTypeIcons[businessType.icon];

	return (
		<button
			type="button"
			onClick={() => onSelect(businessType.id)}
			className={`
				w-full rounded-2xl border p-6 text-left transition-all duration-200
				${
					selected
						? "border-orange-500 bg-orange-50 shadow-md"
						: "border-gray-200 bg-white hover:border-orange-300 hover:shadow-sm"
				}
			`}
		>
			<div className="flex items-start justify-between">
				<div
					className={`
						flex h-14 w-14 items-center justify-center rounded-xl
						${selected ? "bg-orange-500 text-white" : "bg-orange-100 text-orange-600"}
					`}
				>
					{Icon && <Icon size={28} />}
				</div>

				{selected && (
					<CheckCircle2 size={22} className="text-orange-500" />
				)}
			</div>

			<div className="mt-5">
				<span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
					{businessType.category}
				</span>

				<h3 className="mt-4 text-lg font-semibold text-gray-900">
					{businessType.onboarding?.title ?? businessType.name}
				</h3>

				<p className="mt-2 text-sm leading-6 text-gray-600">
					{businessType.onboarding?.subtitle ??
						businessType.description}
				</p>
			</div>
		</button>
	);
}
