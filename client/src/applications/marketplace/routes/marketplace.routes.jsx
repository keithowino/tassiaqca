import MarketplaceLayout from "../layouts/MarketplaceLayout";
import MarketplaceHomePage from "../pages/MarketplaceHomePage";

const marketplaceRoutes = [
	{
		path: "/marketplace",
		element: <MarketplaceLayout />,
		children: [
			{
				index: true,
				element: <MarketplaceHomePage />,
			},
		],
	},
];

export default marketplaceRoutes;
