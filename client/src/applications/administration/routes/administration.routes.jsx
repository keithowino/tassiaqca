import { AuthenticatedRoute } from "../../../platform/routing";

function AdministrationPlaceholder() {
	return (
		<div className="container mx-auto h-screen w-screen">
			<div className="flex flex-col h-full items-center justify-center">
				<h1>Administration</h1>
				<i>Busy, Busy Me...</i>
			</div>
		</div>
	);
}

const administrationRoutes = [
	{
		element: <AuthenticatedRoute />,

		children: [
			{
				path: "/admin",

				element: <AdministrationPlaceholder />,
			},
		],
	},
];

export default administrationRoutes;
