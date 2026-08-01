import { AuthenticatedRoute } from "../../../../platform/routing";

import BusinessOnboardingPage from "../BusinessOnboardingPage";

const onboardingRoutes = [
	{
		element: <AuthenticatedRoute />,

		children: [
			{
				path: "/business/onboarding",

				element: <BusinessOnboardingPage />,
			},
		],
	},
];

export default onboardingRoutes;
