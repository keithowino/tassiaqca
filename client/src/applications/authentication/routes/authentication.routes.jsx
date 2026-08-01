import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { PublicRoute } from "../../../platform/routing";

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
];

export default authenticationRoutes;
