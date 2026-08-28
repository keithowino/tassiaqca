import BusinessLayout from "../layouts/BusinessLayout";
import BusinessHubPage from "../hub/pages/BusinessHubPage";

import { AuthenticatedRoute } from "../../../platform/routing";

import WorkspaceRouteRenderer from "../workspaces/WorkspaceRouteRenderer";

const businessRoutes = [
	{
		element: <AuthenticatedRoute />,

		children: [
			{
				path: "/business/hub",

				element: <BusinessHubPage />,
			},

			{
				path: "/business",

				element: <BusinessLayout />,

				children: [
					{
						index: true,

						element: <WorkspaceRouteRenderer />,
					},
				],
			},
		],
	},
];

export default businessRoutes;
