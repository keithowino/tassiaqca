import { ONBOARDING_STEPS } from "../onboardingSteps";

export default function ProgressIndicator({ currentStep }) {
	const currentIndex = ONBOARDING_STEPS.findIndex(
		(step) => step.id === currentStep,
	);

	const current = ONBOARDING_STEPS[currentIndex];

	return (
		<div className="mb-8 rounded-xl border bg-white p-5">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm font-medium text-slate-500">
						Step {currentIndex + 1} of {ONBOARDING_STEPS.length}
					</p>

					<h3 className="mt-1 text-lg font-semibold">
						{current.title}
					</h3>

					<p className="text-sm text-slate-500">
						{current.description}
					</p>
				</div>

				<div className="flex gap-2">
					{ONBOARDING_STEPS.map((_, index) => (
						<div
							key={index}
							className={`h-2 w-10 rounded-full ${
								index <= currentIndex
									? "bg-orange-500"
									: "bg-slate-200"
							}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
