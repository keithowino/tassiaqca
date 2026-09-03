import { useEffect, useState } from "react";

import { marketplaceService } from "../services";

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

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let isMounted = true;

		async function loadMarketplace() {
			setIsLoading(true);
			setError(null);

			try {
				const [featuredResponse, trendingResponse, businessesResponse] =
					await Promise.all([
						marketplaceService.getFeaturedOfferings(),
						marketplaceService.getTrendingOfferings(),
						marketplaceService.getDiscoveryBusinesses(),
					]);

				if (!isMounted) {
					return;
				}

				setFeaturedOfferings(getCollection(featuredResponse));
				setTrendingOfferings(getCollection(trendingResponse));
				setBusinesses(getCollection(businessesResponse));
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
		return (
			<section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="flex min-h-64 items-center justify-center">
					<p className="text-sm text-slate-500">
						Loading Marketplace...
					</p>
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="rounded-xl border border-red-200 bg-red-50 p-6">
					<h1 className="text-lg font-semibold text-red-900">
						Marketplace unavailable
					</h1>

					<p className="mt-2 text-sm text-red-700">{error}</p>
				</div>
			</section>
		);
	}

	return (
		<section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
			<header className="max-w-3xl">
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
			</header>

			<div className="mt-12 space-y-12">
				<section>
					<div className="flex items-baseline justify-between gap-4">
						<div>
							<h2 className="text-2xl font-semibold text-slate-950">
								Featured offerings
							</h2>

							<p className="mt-1 text-sm text-slate-500">
								Discover selected offerings from Marketplace
								businesses.
							</p>
						</div>
					</div>

					{featuredOfferings.length === 0 ? (
						<p className="mt-6 text-sm text-slate-500">
							No featured offerings are available right now.
						</p>
					) : (
						<div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{featuredOfferings.map((offering) => (
								<article
									key={offering.id}
									className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
								>
									<p className="text-xs font-medium uppercase tracking-wide text-slate-500">
										{offering.type}
									</p>

									<h3 className="mt-2 text-lg font-semibold text-slate-950">
										{offering.name}
									</h3>

									{offering.shortDescription && (
										<p className="mt-2 text-sm leading-6 text-slate-600">
											{offering.shortDescription}
										</p>
									)}
								</article>
							))}
						</div>
					)}
				</section>

				<section>
					<div>
						<h2 className="text-2xl font-semibold text-slate-950">
							Trending offerings
						</h2>

						<p className="mt-1 text-sm text-slate-500">
							Explore offerings currently gaining attention.
						</p>
					</div>

					{trendingOfferings.length === 0 ? (
						<p className="mt-6 text-sm text-slate-500">
							No trending offerings are available right now.
						</p>
					) : (
						<div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{trendingOfferings.map((offering) => (
								<article
									key={offering.id}
									className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
								>
									<p className="text-xs font-medium uppercase tracking-wide text-slate-500">
										{offering.type}
									</p>

									<h3 className="mt-2 text-lg font-semibold text-slate-950">
										{offering.name}
									</h3>

									{offering.shortDescription && (
										<p className="mt-2 text-sm leading-6 text-slate-600">
											{offering.shortDescription}
										</p>
									)}
								</article>
							))}
						</div>
					)}
				</section>

				<section>
					<div>
						<h2 className="text-2xl font-semibold text-slate-950">
							Businesses
						</h2>

						<p className="mt-1 text-sm text-slate-500">
							Discover businesses participating in the
							Marketplace.
						</p>
					</div>

					{businesses.length === 0 ? (
						<p className="mt-6 text-sm text-slate-500">
							No businesses are available right now.
						</p>
					) : (
						<div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{businesses.map((business) => (
								<article
									key={business.id}
									className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
								>
									<p className="text-xs font-medium uppercase tracking-wide text-slate-500">
										{business.businessType}
									</p>

									<h3 className="mt-2 text-lg font-semibold text-slate-950">
										{business.name}
									</h3>

									{business.description && (
										<p className="mt-2 text-sm leading-6 text-slate-600">
											{business.description}
										</p>
									)}
								</article>
							))}
						</div>
					)}
				</section>
			</div>
		</section>
	);
}
