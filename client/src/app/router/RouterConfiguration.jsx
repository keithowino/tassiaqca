import { Navigate, useRoutes } from "react-router-dom";

import { authenticationRoutes } from "../../applications/authentication";
import { bootstrapRoutes } from "../../platform/bootstrap";

import { businessRoutes, onboardingRoutes } from "../../applications/business";
import marketplaceRoutes from "../../applications/marketplace/routes/marketplace.routes";
import administrationRoutes from "../../applications/administration/routes/administration.routes";
import { gatewayRoutes } from "../../applications/gateway";

export default function RouterConfiguration() {
	return useRoutes([
		...gatewayRoutes,

		...authenticationRoutes,

		...bootstrapRoutes,

		...marketplaceRoutes,

		...businessRoutes,
		...onboardingRoutes,

		...administrationRoutes,

		{
			path: "*",

			element: <Navigate to="/" replace />,
		},
	]);
}
