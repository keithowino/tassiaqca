import GatewayLayout from "../layouts/GatewayLayout";
import GatewayPage from "../pages/GatewayPage";

const gatewayRoutes = [
	{
		element: <GatewayLayout />,

		children: [
			{
				path: "/",

				element: <GatewayPage />,
			},
		],
	},
];

export default gatewayRoutes;
