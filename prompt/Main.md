Here are the current states of the following files:

```js
`~\client\src\applications\marketplace\index.js`;

export { default as marketplaceRoutes } from "./routes/marketplace.routes";
```

```js
`~\client\src\applications\marketplace\services\marketplace.service.js`;

import { request } from "../../../platform/api/index.js";

const MARKETPLACE_BASE_URL = "/marketplace";

class MarketplaceService {
	getOfferings(params = {}) {
		return request.get(`${MARKETPLACE_BASE_URL}/offerings`, {
			params,
		});
	}

	getDiscovery(params = {}) {
		return request.get(`${MARKETPLACE_BASE_URL}/discovery`, {
			params,
		});
	}

	search(params = {}) {
		return request.get(`${MARKETPLACE_BASE_URL}/search`, {
			params,
		});
	}

	getCategories(params = {}) {
		return request.get(`${MARKETPLACE_BASE_URL}/categories`, {
			params,
		});
	}

	getBusinessProfile(slug) {
		return request.get(
			`${MARKETPLACE_BASE_URL}/profiles/businesses/${encodeURIComponent(slug)}`,
		);
	}

	getOfferingProfile(slug) {
		return request.get(
			`${MARKETPLACE_BASE_URL}/profiles/offerings/${encodeURIComponent(slug)}`,
		);
	}
}

export default new MarketplaceService();
```

```js
`~\client\src\applications\marketplace\services\index.js`;

export { default as marketplaceService } from "./marketplace.service.js";
```

```jsx
`~\client\src\applications\marketplace\routes\marketplace.routes.jsx`;

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
```

```jsx
`~\client\src\applications\marketplace\pages\MarketplaceHomePage.jsx`;

export default function MarketplaceHomePage() {
	return (
		<section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
			<div className="max-w-3xl">
				<p className="text-sm font-medium uppercase tracking-wide text-slate-500">
					TassiaQCA Marketplace
				</p>

				<h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
					Discover businesses and offerings
				</h1>

				<p className="mt-4 text-base leading-7 text-slate-600">
					Explore offerings from businesses across the TassiaQCA
					Marketplace.
				</p>
			</div>
		</section>
	);
}
```

```jsx
`~\client\src\applications\marketplace\layouts\MarketplaceLayout.jsx`;

import { Outlet } from "react-router-dom";

export default function MarketplaceLayout() {
	return (
		<div className="min-h-screen bg-slate-50 text-slate-900">
			<main className="min-h-screen">
				<Outlet />
			</main>
		</div>
	);
}
```
