export const ONBOARDING_STEP_IDS = Object.freeze({
	BUSINESS_INFORMATION: "BUSINESS_INFORMATION",

	BUSINESS_IDENTITY: "BUSINESS_IDENTITY",

	REVIEW: "REVIEW",
});

export const ONBOARDING_STEPS = [
	{
		id: ONBOARDING_STEP_IDS.BUSINESS_INFORMATION,

		title: "Business Information",

		description: "Tell us about your business.",
	},

	{
		id: ONBOARDING_STEP_IDS.BUSINESS_IDENTITY,

		title: "Business Identity",

		description: "Choose how your business appears.",
	},

	{
		id: ONBOARDING_STEP_IDS.REVIEW,

		title: "Review",

		description: "Confirm everything before provisioning.",
	},
];
