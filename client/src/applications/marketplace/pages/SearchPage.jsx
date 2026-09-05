import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { OfferingCard } from "../components/index.js";
import { marketplaceService } from "../services/index.js";

import {
	Form,
	FormActions,
	FormField,
	FormInput,
	FormLabel,
	LoadEmptyResponse,
	LoadError,
	LoadingScreen,
	PageSection,
	SectionHeader,
	SeedHeader,
} from "../../../shared/index.js";

function getCollection(response) {
	return response?.data?.data?.data ?? [];
}

function getErrorMessage(error) {
	return (
		error?.response?.data?.message ||
		error?.message ||
		"Unable to search the Marketplace right now."
	);
}

export default function SearchPage() {
	const [searchParams, setSearchParams] = useSearchParams();

	const [categories, setCategories] = useState([]);
	const [search, setSearch] = useState(searchParams.get("search") || "");
	const [type, setType] = useState(searchParams.get("type") || "");
	const [categoryId, setCategoryId] = useState(
		searchParams.get("categoryId") || "",
	);

	const [offerings, setOfferings] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let isMounted = true;

		async function loadCategories() {
			try {
				const response = await marketplaceService.getCategories({
					limit: 100,
				});

				if (!isMounted) {
					return;
				}

				setCategories(getCollection(response));
			} catch {
				// Category loading failure should not prevent text/type
				// search from remaining usable.
				if (isMounted) {
					setCategories([]);
				}
			}
		}

		loadCategories();

		return () => {
			isMounted = false;
		};
	}, []);

	useEffect(() => {
		let isMounted = true;

		async function loadResults() {
			const params = {
				search: searchParams.get("search") || undefined,
				type: searchParams.get("type") || undefined,
				categoryId: searchParams.get("categoryId") || undefined,
			};

			setIsLoading(true);
			setError(null);

			try {
				const response = await marketplaceService.search(params);

				if (!isMounted) {
					return;
				}

				setOfferings(getCollection(response));
			} catch (requestError) {
				if (!isMounted) {
					return;
				}

				setError(getErrorMessage(requestError));
				setOfferings([]);
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		}

		loadResults();

		return () => {
			isMounted = false;
		};
	}, [searchParams]);

	function handleSubmit(event) {
		event.preventDefault();

		const nextParams = new URLSearchParams();

		const trimmedSearch = search.trim();

		if (trimmedSearch) {
			nextParams.set("search", trimmedSearch);
		}

		if (type) {
			nextParams.set("type", type);
		}

		if (categoryId) {
			nextParams.set("categoryId", categoryId);
		}

		setSearchParams(nextParams);
	}

	return (
		<main className="pb-6">
			<SeedHeader
				badgeText="Marketplace Search"
				description="Find published offerings from businesses across the TassiaQCA Marketplace."
				headBack={true}
				to="/marketplace"
				title="Search Marketplace"
			>
				Marketplace
			</SeedHeader>

			<div className="mt-8 space-y-12">
				<PageSection>
					<SectionHeader
						title="Find an offering"
						description="Search by name or description, then refine the results by offering type or category."
						align="left"
					/>

					<Form
						onSubmit={handleSubmit}
						className="mt-6 rounded-2xl border border-slate-200 bg-white p-6"
					>
						<FormField>
							<FormLabel htmlFor="marketplace-search">
								Search
							</FormLabel>

							<FormInput
								id="marketplace-search"
								name="search"
								type="search"
								value={search}
								onChange={(event) =>
									setSearch(event.target.value)
								}
								placeholder="Search offerings..."
								autoComplete="off"
							/>
						</FormField>

						<div className="grid gap-6 md:grid-cols-2">
							<FormField>
								<FormLabel htmlFor="marketplace-type">
									Offering type
								</FormLabel>

								{/* Ill have to make this section modular to avoid the fixed offering types */}
								<select
									id="marketplace-type"
									name="type"
									value={type}
									onChange={(event) =>
										setType(event.target.value)
									}
									className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
								>
									<option value="">All types</option>
									<option value="PRODUCT">Product</option>
									<option value="SERVICE">Service</option>
									<option value="RENTAL">Rental</option>
									<option value="MEMBERSHIP">
										Membership
									</option>
									<option value="BOOKING">Booking</option>
									<option value="EVENT">Event</option>
									<option value="COURSE">Course</option>
									<option value="SUBSCRIPTION">
										Subscription
									</option>
									<option value="PACKAGE">Package</option>
									<option value="DIGITAL_DOWNLOAD">
										Digital Download
									</option>
								</select>
							</FormField>

							<FormField>
								<FormLabel htmlFor="marketplace-category">
									Category
								</FormLabel>

								<select
									id="marketplace-category"
									name="categoryId"
									value={categoryId}
									onChange={(event) =>
										setCategoryId(event.target.value)
									}
									className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
								>
									<option value="">All categories</option>

									{categories.map((category) => (
										<option
											key={category.id}
											value={category.id}
										>
											{category.name}
										</option>
									))}
								</select>
							</FormField>
						</div>

						<FormActions>
							<button
								type="submit"
								className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
							>
								Search Marketplace
							</button>
						</FormActions>
					</Form>
				</PageSection>

				<PageSection>
					<SectionHeader
						title="Search results"
						description={
							searchParams.toString()
								? "Published offerings matching your search."
								: "Explore published Marketplace offerings."
						}
						align="left"
					/>

					{isLoading ? (
						<div className="mt-6">
							<LoadingScreen message="Searching Marketplace..." />
						</div>
					) : error ? (
						<div className="mt-6">
							<LoadError
								message="Unable to search the Marketplace right now."
								error={error}
							/>
						</div>
					) : offerings.length === 0 ? (
						<div className="mt-6">
							<LoadEmptyResponse message="No offerings matched your search." />
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
			</div>
		</main>
	);
}
