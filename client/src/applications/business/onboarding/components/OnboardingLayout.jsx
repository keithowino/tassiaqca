import ProgressIndicator from "./ProgressIndicator";

export default function OnboardingLayout({ children, currentStep }) {
	return (
		<div className="min-h-screen bg-slate-50">
			<div className="mx-auto max-w-4xl px-6 py-12">
				<div className="mb-10">
					<h1 className="text-3xl font-bold">Business Onboarding</h1>

					<p className="mt-2 text-slate-600">
						Let's provision your business workspace.
					</p>
				</div>

				<ProgressIndicator currentStep={currentStep} />

				{children}
			</div>
		</div>
	);
}
