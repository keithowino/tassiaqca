import useBusinessOnboarding from "../hooks/useBusinessOnboarding";

import OnboardingLayout from "./OnboardingLayout";

import BusinessInformationForm from "./BusinessInformationForm";
import BusinessIdentityStep from "./BusinessIdentityStep";
import ReviewStep from "./ReviewStep";
import { ONBOARDING_STEP_IDS } from "../onboardingSteps";

export default function OnboardingWizard() {
	const { currentStep } = useBusinessOnboarding();

	/**
	 * Now adding a new step requires only:
	 * - Creating the component.
	 * - Registering it.
	 * - Adding the step to onboardingSteps.js.
	 */
	const STEP_COMPONENTS = {
		BUSINESS_INFORMATION: BusinessInformationForm,

		BUSINESS_IDENTITY: BusinessIdentityStep,

		REVIEW: ReviewStep,
	};

	const CurrentStep = STEP_COMPONENTS[currentStep];

	return (
		<OnboardingLayout currentStep={currentStep}>
			<CurrentStep />
		</OnboardingLayout>
	);
}
