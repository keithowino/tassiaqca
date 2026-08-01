import { Button } from "../../../../shared/ui";
import useBusinessOnboarding from "../hooks/useBusinessOnboarding";

/**
 * Temporary placeholder step
 */
export default function BusinessIdentityStep() {
	const { nextStep, previousStep } = useBusinessOnboarding();

	return (
		<div className="rounded-2xl bg-white p-8 shadow-sm">
			<h2 className="text-xl font-semibold">Business Identity</h2>

			<p className="mt-2 text-slate-600">
				This step will configure branding, logo, colors and public
				identity.
			</p>

			<div className="mt-8 flex justify-between">
				<Button variant="secondary" onClick={previousStep}>
					Back
				</Button>

				<Button onClick={nextStep}>Continue</Button>
			</div>
		</div>
	);
}
