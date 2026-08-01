import BusinessOnboardingProvider from "./context/BusinessOnboardingProvider";

import OnboardingWizard from "./components/OnboardingWizard";

export default function BusinessOnboardingPage() {
	return (
		<BusinessOnboardingProvider>
			<OnboardingWizard />
		</BusinessOnboardingProvider>
	);
}
