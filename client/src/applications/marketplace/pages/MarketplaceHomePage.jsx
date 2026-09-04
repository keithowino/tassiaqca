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
