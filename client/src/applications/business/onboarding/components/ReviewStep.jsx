import { Button, FormError } from "../../../../shared/ui";

import useBusinessOnboarding from "../hooks/useBusinessOnboarding";

export default function ReviewStep() {
	const { values, previousStep, submit, loading, error } =
		useBusinessOnboarding();

	const rows = [
		{
			label: "Business Name",
			value: values.name,
		},
		{
			label: "Description",
			value: values.description,
		},
		{
			label: "Business Type",
			value: values.businessType,
		},
		{
			label: "Phone",
			value: values.phone,
		},
		{
			label: "Email",
			value: values.email,
		},
	];

	return (
		<div className="rounded-2xl bg-white p-8 shadow-sm">
			<h2 className="text-2xl font-semibold">Review Your Business</h2>

			<p className="mt-2 text-slate-600">
				Confirm the information below before your workspace is
				provisioned.
			</p>

			<div className="mt-8 divide-y rounded-xl border">
				{rows.map((row) => (
					<div
						key={row.label}
						className="flex items-start justify-between gap-8 px-6 py-4"
					>
						<div className="font-medium text-slate-700">
							{row.label}
						</div>

						<div className="max-w-md text-right text-slate-900">
							{row.value || (
								<span className="italic text-slate-400">
									Not provided
								</span>
							)}
						</div>
					</div>
				))}
			</div>

			{error && (
				<div className="mt-6">
					<FormError>{error}</FormError>
				</div>
			)}

			<div className="mt-8 flex justify-between">
				<Button
					type="button"
					variant="secondary"
					onClick={previousStep}
					disabled={loading}
				>
					Back
				</Button>

				<Button type="button" onClick={submit} disabled={loading}>
					{loading ? "Creating Business..." : "Create Business"}
				</Button>
			</div>
		</div>
	);
}
