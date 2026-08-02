import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import BusinessOnboardingContext from "./BusinessOnboardingContext";

import onboardingService from "../services/onboarding.service";
import { ONBOARDING_STEP_IDS, ONBOARDING_STEPS } from "../onboardingSteps";
import { bootstrapSession } from "../../../../platform/workspace";

const initialValues = {
	name: "",
	description: "",
	businessType: "",
	phone: "",
	email: "",
};

export default function BusinessOnboardingProvider({ children }) {
	const navigate = useNavigate();

	const [values, setValues] = useState(initialValues);

	const [currentStep, setCurrentStep] = useState(
		ONBOARDING_STEP_IDS.BUSINESS_INFORMATION,
	);

	const [loading, setLoading] = useState(false);

	const [error, setError] = useState(null);

	const updateField = (field, value) => {
		setValues((previous) => ({
			...previous,
			[field]: value,
		}));
	};

	const nextStep = () => {
		const currentIndex = ONBOARDING_STEPS.findIndex(
			(step) => step.id === currentStep,
		);

		if (currentIndex < ONBOARDING_STEPS.length - 1) {
			setCurrentStep(ONBOARDING_STEPS[currentIndex + 1].id);
		}
	};

	const previousStep = () => {
		const currentIndex = ONBOARDING_STEPS.findIndex(
			(step) => step.id === currentStep,
		);

		if (currentIndex > 0) {
			setCurrentStep(ONBOARDING_STEPS[currentIndex - 1].id);
		}
	};

	const submit = async () => {
		setLoading(true);

		setError(null);

		try {
			const result = await onboardingService.createBusiness(values);

			bootstrapSession.begin({
				businessId: result.id,
			});

			navigate("/bootstrap", {
				replace: true,
			});
		} catch (error) {
			console.error(error);

			setError(
				error.response?.data?.error?.message ??
					error.message ??
					"Unable to create business.",
			);
		} finally {
			setLoading(false);
		}
	};

	const value = useMemo(
		() => ({
			values,

			currentStep,

			loading,

			error,

			updateField,

			nextStep,

			previousStep,

			submit,
		}),
		[values, currentStep, loading, error],
	);

	return (
		<BusinessOnboardingContext.Provider value={value}>
			{children}
		</BusinessOnboardingContext.Provider>
	);
}
