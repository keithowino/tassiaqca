```js
`~\client\src\app\router\AppRouter.jsx`;

import { BrowserRouter } from "react-router-dom";

import RouterConfiguration from "./RouterConfiguration";

export function AppRouter() {
	return (
		<BrowserRouter>
			<RouterConfiguration />
		</BrowserRouter>
	);
}
```

```js
`~\client\src\app\router\RouterConfiguration.jsx`;

import { Navigate, useRoutes } from "react-router-dom";

import { authenticationRoutes } from "../../applications/authentication";
import { bootstrapRoutes } from "../../platform/bootstrap";

import { businessRoutes, onboardingRoutes } from "../../applications/business";
import marketplaceRoutes from "../../applications/marketplace/routes/marketplace.routes";
import administrationRoutes from "../../applications/administration/routes/administration.routes";
import { gatewayRoutes } from "../../applications/gateway";

export default function RouterConfiguration() {
	return useRoutes([
		...gatewayRoutes,

		...authenticationRoutes,

		...bootstrapRoutes,

		...marketplaceRoutes,

		...businessRoutes,
		...onboardingRoutes,

		...administrationRoutes,

		{
			path: "*",

			element: <Navigate to="/" replace />,
		},
	]);
}
```

```js
`~\client\src\applications\business\components\SidebarNavigation.jsx`;

import { NavLink } from "react-router-dom";

export default function SidebarNavigation({ navigation }) {
	if (!navigation?.sections?.length) {
		return null;
	}

	return (
		<nav className="space-y-8">
			{navigation.sections.map((section) => (
				<div key={section.id}>
					<h3 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
						{section.label}
					</h3>

					<div className="space-y-1">
						{section.items.map((item) => (
							<NavLink
								key={item.id}
								to={`/business${item.path}`}
								end={item.path === "/"}
								className={({ isActive }) =>
									[
										"block rounded-lg px-3 py-2 transition",
										isActive
											? "bg-orange-500 text-white"
											: "text-slate-700 hover:bg-slate-100",
									].join(" ")
								}
							>
								{item.label}
							</NavLink>
						))}
					</div>
				</div>
			))}
		</nav>
	);
}
```

```js
`~\client\src\applications\business\hub\hooks\useBusinessHub.js`;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import businessService from "../services/business.service";

import { bootstrapSession } from "../../../../platform/workspace";

export default function useBusinessHub() {
	const navigate = useNavigate();

	const [businesses, setBusinesses] = useState([]);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadBusinesses();
	}, []);

	async function loadBusinesses() {
		try {
			const result = await businessService.listBusinesses();

			setBusinesses(result);
		} finally {
			setLoading(false);
		}
	}

	function openWorkspace(business) {
		bootstrapSession.begin({
			businessId: business.id,
		});

		navigate("/bootstrap");
	}

	function createBusiness() {
		navigate("/business/onboarding");
	}

	return {
		businesses,

		loading,

		openWorkspace,

		createBusiness,

		reload: loadBusinesses,
	};
}
```
