import { AuthLayout } from "../layouts/index.js";
import { LoginPage, RegisterPage, SecurityPage } from "../pages/index.js";
import { AuthenticatedRoute, PublicRoute } from "../../../platform/index.js";

const authenticationRoutes = [
	{
		element: <AuthLayout />,

		children: [
			{
				element: <PublicRoute />,

				children: [
					{
						path: "/login",
						element: <LoginPage />,
					},

					{
						path: "/register",
						element: <RegisterPage />,
					},
				],
			},
		],
	},

	{
		element: <AuthenticatedRoute />,
		children: [
			{
				path: "/account/settings/security",
				element: <SecurityPage />,
			},
		],
	},
];

export default authenticationRoutes;
