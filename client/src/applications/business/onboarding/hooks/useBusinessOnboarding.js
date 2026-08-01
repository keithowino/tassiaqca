import { useContext } from "react";

import BusinessOnboardingContext from "../context/BusinessOnboardingContext";

export default function useBusinessOnboarding() {
	const context = useContext(BusinessOnboardingContext);

	if (!context) {
		throw new Error(
			"useBusinessOnboarding must be used within BusinessOnboardingProvider.",
		);
	}

	return context;
}
