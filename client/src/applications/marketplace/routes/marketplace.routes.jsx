import { AuthenticatedRoute } from "../../../platform/routing";

function MarketplacePlaceholder() {
	return (
		<div className="container mx-auto h-screen w-screen">
			<div className="flex flex-col h-full items-center justify-center">
				<h1>Marketplace</h1>
				<i>Busy, Busy Me...</i>
			</div>
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
