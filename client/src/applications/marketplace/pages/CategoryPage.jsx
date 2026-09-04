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
