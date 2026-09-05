import { MarketplaceLayout } from "../layouts/index.js";
import {
	BusinessProfilePage,
	CategoryPage,
	MarketplaceHomePage,
	OfferingProfilePage,
	SearchPage,
} from "../pages/index.js";

const marketplaceRoutes = [
	{
		path: "/marketplace",
		element: <MarketplaceLayout />,
		children: [
			{
				index: true,
				element: <MarketplaceHomePage />,
			},
			{
				path: "search",
				element: <SearchPage />,
			},
			{
				path: "businesses/:slug",
				element: <BusinessProfilePage />,
			},
			{
				path: "offerings/:slug",
				element: <OfferingProfilePage />,
			},
			{
				path: "categories/:slug",
				element: <CategoryPage />,
			},
		],
	},
];

export default marketplaceRoutes;
