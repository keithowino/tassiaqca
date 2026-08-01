import { Route } from "react-router-dom";

import BootstrapPage from "../pages/BootstrapPage";

import { AuthenticatedRoute } from "../../routing";

const bootstrapRoutes = [
	{
		element: <AuthenticatedRoute />,

		children: [
			{
				path: "/bootstrap",
				element: <BootstrapPage />,
			},
		],
	},
];

export default bootstrapRoutes;
