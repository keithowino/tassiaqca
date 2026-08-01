import { AuthenticatedRoute } from "../../../platform/routing";

function AdministrationPlaceholder() {
	return (
		<div style={{ padding: "2rem" }}>
			<h1>Administration</h1>
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
