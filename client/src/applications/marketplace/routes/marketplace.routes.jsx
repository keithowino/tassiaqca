import { AuthenticatedRoute } from "../../../platform/routing";

function MarketplacePlaceholder() {
	return (
		<div style={{ padding: "2rem" }}>
			<h1>Marketplace</h1>
		</div>
	);
}

const marketplaceRoutes = [
	{
		element: <AuthenticatedRoute />,

		children: [
			{
				path: "/marketplace",

				element: <MarketplacePlaceholder />,
			},
		],
	},
];

export default marketplaceRoutes;
