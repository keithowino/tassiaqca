For your information, these are the current states of the following files:

```jsx
`~\client\src\applications\marketplace\pages\MarketplaceHomePage.jsx`;

import { useEffect, useState } from "react";

import { marketplaceService } from "../services";
import { BusinessCard, OfferingCard } from "../components/index.js";
import { Link } from "react-router-dom";
import {
	LoadEmptyResponse,
	LoadError,
	LoadingScreen,
	PageSection,
	SectionHeader,
	SeedHeader,
} from "../../../shared/index.js";
import { PlatformIntents } from "../../../platform/index.js";

function getErrorMessage(error) {
	return (
		error?.response?.data?.message ||
		error?.message ||
		"Unable to load the Marketplace right now."
	);
}

function getCollection(response) {
	return response?.data?.data?.data ?? [];
}

export default function MarketplaceHomePage() {
	const [featuredOfferings, setFeaturedOfferings] = useState([]);
	const [trendingOfferings, setTrendingOfferings] = useState([]);
	const [businesses, setBusinesses] = useState([]);
	const [categories, setCategories] = useState([]);

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let isMounted = true;

		async function loadMarketplace() {
			setIsLoading(true);
			setError(null);

			try {
				const [
					featuredResponse,
					trendingResponse,
					businessesResponse,
					categoriesResponse,
				] = await Promise.all([
					marketplaceService.getFeaturedOfferings(),
					marketplaceService.getTrendingOfferings(),
					marketplaceService.getDiscoveryBusinesses(),
					marketplaceService.getCategories(),
				]);

				if (!isMounted) {
					return;
				}

				setFeaturedOfferings(getCollection(featuredResponse));
				setTrendingOfferings(getCollection(trendingResponse));
				setBusinesses(getCollection(businessesResponse));
				setCategories(getCollection(categoriesResponse));
			} catch (requestError) {
				if (!isMounted) {
					return;
				}

				setError(getErrorMessage(requestError));
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		}

		loadMarketplace();

		return () => {
			isMounted = false;
		};
	}, []);

	if (isLoading) {
		return <LoadingScreen message="Loading Marketplace..." />;
	}

	if (error) {
		return (
			<LoadError
				message="Unable to load the Marketplace right now."
				error={error}
			/>
		);
	}

	return (
		<main className="pb-6">
			<SeedHeader
				badgeText="TassiaQCA Marketplace"
				description="Explore offerings from businesses across the TassiaQCA
					Marketplace."
				headBack={true}
				to="/"
				title="Discover businesses and offerings"
			>
				Gateway
			</SeedHeader>

			<div className="mt-8 space-y-12">
				<PageSection>
					<SectionHeader
						title="Browse by category"
						description="Explore Marketplace offerings by category."
						align="left"
					/>

					{categories.length === 0 ? (
						<LoadEmptyResponse message="No categories are available right now." />
					) : (
						<nav
							aria-label="Marketplace categories"
							className="mt-6 flex flex-wrap gap-3"
						>
							{categories.map((category) => (
								<Link
									key={category.id}
									to={`/marketplace/categories/${category.slug}`}
									className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:text-slate-950"
								>
									{category.name}
								</Link>
							))}
						</nav>
					)}
				</PageSection>

				<PageSection>
					<SectionHeader
						title="Featured offerings"
						description="Discover selected offerings from Marketplace
								businesses."
						align="left"
					/>

					{featuredOfferings.length === 0 ? (
						<LoadEmptyResponse message="No offerings are available right now." />
					) : (
						<div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{featuredOfferings.map((offering) => (
								<OfferingCard
									key={offering.id}
									offering={offering}
								/>
							))}
						</div>
					)}
				</PageSection>

				<PageSection>
					<SectionHeader
						title="Trending offerings"
						description="Explore offerings currently gaining attention."
						align="left"
					/>

					{trendingOfferings.length === 0 ? (
						<LoadEmptyResponse message="No trending offerings are available right now." />
					) : (
						<div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{trendingOfferings.map((offering) => (
								<OfferingCard
									key={offering.id}
									offering={offering}
								/>
							))}
						</div>
					)}
				</PageSection>

				<PageSection>
					<SectionHeader
						title="Businesses"
						description="Discover businesses participating in the
							Marketplace."
						align="left"
					/>

					{businesses.length === 0 ? (
						<LoadEmptyResponse
							message="No businesses are available right now."
							intent={PlatformIntents.intent.START_BUSINESS}
							actionLabel="Register Business"
						/>
					) : (
						<div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{businesses.map((business) => (
								<BusinessCard
									key={business.id}
									business={business}
								/>
							))}
						</div>
					)}
				</PageSection>
			</div>
		</main>
	);
}
```

```jsx
`~\client\src\shared\components\LoadEmptyResponse.jsx`;

import { JourneyLink } from "../../platform/index.js";
import { Button } from "../index.js";

export default function LoadEmptyResponse({
	message = "No data available.",
	intent,
	actionLabel,
}) {
	return (
		<div className="text-center py-8 bg-white rounded-2xl border border-gray-100">
			<p className="text-gray-500">{message}</p>
			{intent && (
				<Button
					as={JourneyLink}
					intent={intent}
					className="mt-3 inline-block bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-orange-600 transition-colors"
				>
					{actionLabel || "Take Action"}
				</Button>
			)}
		</div>
	);
}
```

```jsx
`~\client\src\shared\components\LoadError.jsx`;

import { Heading, Text } from "../ui";
import HeadBack from "./HeadBack";

export default function LoadError({
	error = null,
	message = "Unable to load the requested content.",
	headBack = false,
	to = "/",
	children,
}) {
	return (
		<section className="min-h-screen flex flex-col justify-center bg-gray-50 px-4 py-2">
			{headBack && (
				<div className="absolute top-4 left-4">
					<HeadBack to={to}>{children}</HeadBack>
				</div>
			)}
			<div className="flex flex-col h-full w-full items-center justify-center">
				<div className="text-center">
					<Heading level={3} className="mt-6">
						TassiaQCA
					</Heading>
					<Heading
						level={4}
						className="text-lg font-semibold text-red-900"
					>
						{message}
					</Heading>
					<Text className="mt-2 text-sm text-red-700">{error}</Text>
				</div>
			</div>
		</section>
	);
}
```

```jsx
`~\client\src\shared\components\LoadError.jsx`;

import { Link } from "react-router-dom";

export default function HeadBack({ to, children }) {
	return (
		<Link
			to={to}
			className="text-sm font-medium text-white hover:text-slate-950"
		>
			← Back to {children}
		</Link>
	);
}
```

```jsx
`~\client\src\shared\components\LoadingScreen.jsx`;

import { Heading, Text } from "../ui";

export default function LoadingScreen({ message = "Loading..." }) {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="text-center">
				<div className="w-12 h-12 mx-auto rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />

				<Heading level={3} className="mt-6">
					TassiaQCA
				</Heading>

				<Text className="mt-2">{message}</Text>
			</div>
		</div>
	);
}
```

```jsx
`~\client\src\shared\components\SeedHeader.jsx`;

import { Badge, HeadBack, Heading, Hero, Text } from "../../shared/index.js";

export default function SeedHeader({
	badgeText,
	children,
	description,
	subDescription,
	headBack = false,
	to = "/",
	title,
}) {
	return (
		<Hero>
			<div className="max-w-3xl mb-5">
				{headBack && (
					<div className="absolute top-4 left-4">
						<HeadBack to={to}>{children}</HeadBack>
					</div>
				)}
				<Badge>{badgeText}</Badge>

				<Heading level={1} className="mt-6">
					{title}
				</Heading>

				<Text className="mt-3 text-lg">
					{description}{" "}
					{subDescription && (
						<span className="font-bold">{subDescription}</span>
					)}
				</Text>
			</div>
		</Hero>
	);
}
```

```js
`~\client\src\platform\journey\constants\platformIntents.js`;

const intent = {
	MARKETPLACE: "MARKETPLACE",

	START_BUSINESS: "START_BUSINESS",

	JOIN_BUSINESS: "JOIN_BUSINESS",

	ADMINISTRATION: "ADMINISTRATION",
};

export default {
	intent,
};
```

```jsx
`~\client\src\applications\marketplace\pages\CategoryPage.jsx`;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { OfferingCard } from "../components/index.js";
import { marketplaceService } from "../services/index.js";
import {
	LoadError,
	LoadingScreen,
	PageSection,
	SectionHeader,
	SeedHeader,
} from "../../../shared/index.js";

/**
 * #### Why this implementation?
 *
 * We are intentionally not creating a useCategory() hook yet.
 * The architecture guidance says not to create hooks merely to populate the hooks/ directory; hooks should be introduced when state/data-fetching logic becomes reusable.
 * At this point only CategoryPage needs this workflow.
 */

function getCollection(response) {
	return response?.data?.data?.data ?? [];
}

export default function CategoryPage() {
	const { slug } = useParams();

	const [category, setCategory] = useState(null);
	const [offerings, setOfferings] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let isMounted = true;

		async function loadCategory() {
			setIsLoading(true);
			setError(null);

			try {
				const categoriesResponse =
					await marketplaceService.getCategories({
						limit: 100,
					});

				const categories = getCollection(categoriesResponse);

				const matchedCategory = categories.find(
					(item) => item.slug === slug,
				);

				if (!matchedCategory) {
					throw new Error("Category not found.");
				}

				const offeringsResponse =
					await marketplaceService.getCategoryOfferings(
						matchedCategory.id,
					);

				const categoryOfferings = getCollection(offeringsResponse);

				if (!isMounted) {
					return;
				}

				setCategory(matchedCategory);
				setOfferings(categoryOfferings);
			} catch (requestError) {
				if (!isMounted) {
					return;
				}

				setError(
					requestError?.message || "Unable to load this category.",
				);
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		}

		loadCategory();

		return () => {
			isMounted = false;
		};
	}, [slug]);

	if (isLoading) {
		return <LoadingScreen message="Loading category..." />;
	}

	if (error) {
		return (
			<LoadError
				error={error}
				message="Unable to load this category."
				headBack={true}
				to="/marketplace"
			>
				Marketplace
			</LoadError>
		);
	}

	return (
		<main className="pb-6">
			<SeedHeader
				badgeText="Category"
				description={category.description}
				headBack={true}
				to="/marketplace"
				title={category.name}
			>
				Marketplace
			</SeedHeader>

			<PageSection>
				<SectionHeader
					title="Offerings"
					description="Discover offerings in this category."
					align="left"
				/>

				{offerings.length === 0 ? (
					<div className="mt-6 rounded-xl border border-slate-200 bg-white p-8">
						<p className="text-sm text-slate-600">
							There are currently no offerings in this category.
						</p>
					</div>
				) : (
					<div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{offerings.map((offering) => (
							<OfferingCard
								key={offering.id}
								offering={offering}
							/>
						))}
					</div>
				)}
			</PageSection>
		</main>
	);
}
```
