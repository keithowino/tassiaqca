The completion of the creation of the first version of the `/marketplace/businesses/:slug` page has been verified. We may proceed to create the Offering Profile, Here are the current states of the following files:

```js
`~\server\src\modules\marketplace\profiles\offerings\routes\offeringProfile.routes.js`;

import { Router } from "express";

import { offeringProfileController } from "../controllers/index.js";

const router = Router();

router.get("/:slug", offeringProfileController.getOfferingProfile);

export default router;
```

```js
`~\server\src\modules\marketplace\profiles\offerings\controllers\offeringProfile.controller.js`;

import {
	validateRequest,
	asyncHandler,
	success,
} from "../../../../../shared/index.js";

import { offeringProfileParamsSchema } from "../validators/index.js";
import { offeringProfileService } from "../services/index.js";

const getOfferingProfile = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: offeringProfileParamsSchema,
		},
		req,
	);

	const result = await offeringProfileService.getBySlug(params.slug);

	return success(
		res,
		result,
		"Marketplace offering profile retrieved successfully.",
	);
});

export default {
	getOfferingProfile,
};
```

```js
`~\server\src\modules\marketplace\profiles\offerings\services\offeringProfile.service.js`;

import {
	AppError,
	ErrorCodes,
	HTTP_STATUS,
} from "../../../../../shared/index.js";

import { offeringProfileRepository } from "../repositories/index.js";
import { offeringProfilePresenter } from "../presenters/index.js";

class OfferingProfileService {
	async getBySlug(slug) {
		const offering =
			await offeringProfileRepository.findPublishedBySlug(slug);

		if (!offering) {
			throw new AppError(
				"Offering not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		return offeringProfilePresenter.present(offering);
	}
}

export default new OfferingProfileService();
```

```js
`~\server\src\modules\marketplace\profiles\offerings\repositories\offeringProfile.repository.js`;

import { offeringService } from "../../../../offering/index.js";

async function findPublishedBySlug(slug) {
	return offeringService.findPublishedForMarketplaceBySlug(slug);
}

export default {
	findPublishedBySlug,
};
```

```js
`~\server\src\modules\marketplace\profiles\offerings\presenters\offeringProfile.presenter.js`;

import { marketplaceOfferingPresenter } from "../../../presenters/index.js";

class OfferingProfilePresenter {
	present(offering) {
		if (!offering) {
			return null;
		}

		/**
		 * Later, when Offering Profiles acquire profile-specific information—categories, variants, media, pricing, availability, etc.—this presenter becomes the place where the richer profile representation can be composed.
		 */
		return marketplaceOfferingPresenter.present(offering);
	}
}

export default new OfferingProfilePresenter();
```

```js
`~\server\src\modules\marketplace\profiles\offerings\validators\offeringProfileParams.schema.js`;

import { z } from "zod";

const offeringProfileParamsSchema = z.object({
	slug: z.string().trim().min(1),
});

export default offeringProfileParamsSchema;
```

```jsx
`~\client\src\applications\marketplace\pages\BusinessProfilePage.jsx`;

import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { OfferingCard } from "../components/index.js";
import { marketplaceService } from "../services/index.js";

import {
	LoadEmptyResponse,
	LoadError,
	LoadExperience,
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
		"Unable to load this business profile right now."
	);
}

function getProfile(response) {
	return response?.data?.data ?? null;
}

export default function BusinessProfilePage() {
	const { slug } = useParams();

	const [profile, setProfile] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let isMounted = true;

		async function loadProfile() {
			setIsLoading(true);
			setError(null);

			try {
				const response =
					await marketplaceService.getBusinessProfile(slug);

				if (!isMounted) {
					return;
				}

				setProfile(getProfile(response));
			} catch (requestError) {
				if (!isMounted) {
					return;
				}

				setError(getErrorMessage(requestError));
				setProfile(null);
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		}

		loadProfile();

		return () => {
			isMounted = false;
		};
	}, [slug]);

	if (isLoading) {
		return <LoadingScreen message="Loading business profile..." />;
	}

	if (error) {
		return (
			<LoadError
				error={error}
				message="Unable to load this business profile."
				headBack={true}
				to="/marketplace"
			>
				Marketplace
			</LoadError>
		);
	}

	if (!profile) {
		return (
			<LoadError
				message="This business profile could not be found."
				headBack={true}
				to="/marketplace"
			>
				Marketplace
			</LoadError>
		);
	}

	const offerings = profile.offerings ?? [];

	return (
		<main className="pb-6">
			<SeedHeader
				badgeText="Business Profile"
				description={
					profile.description ||
					"Discover this business and its published offerings."
				}
				headBack={true}
				to="/marketplace"
				title={profile.name}
			>
				Marketplace
			</SeedHeader>

			<div className="mt-8 space-y-12">
				<PageSection>
					<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
						{profile.branding?.coverImage && (
							<div className="h-48 w-full overflow-hidden bg-slate-100">
								<img
									src={profile.branding.coverImage}
									alt=""
									className="h-full w-full object-cover"
								/>
							</div>
						)}

						<div className="p-6 sm:p-8">
							<div className="flex flex-col gap-6 sm:flex-row sm:items-start">
								{profile.branding?.logo && (
									<img
										src={profile.branding.logo}
										alt={`${profile.name} logo`}
										className="h-20 w-20 rounded-2xl border border-slate-200 bg-white object-cover"
									/>
								)}

								<div className="min-w-0 flex-1">
									<div className="flex flex-wrap items-center gap-3">
										<p className="text-xs font-medium uppercase tracking-wide text-slate-500">
											{profile.businessType}
										</p>

										{profile.verified && (
											<span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
												Verified
											</span>
										)}
									</div>

									<h2 className="mt-2 text-2xl font-semibold text-slate-950">
										{profile.name}
									</h2>

									{profile.description && (
										<p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
											{profile.description}
										</p>
									)}
								</div>
							</div>

							{(profile.contact?.phone ||
								profile.contact?.email) && (
								<div className="mt-8 border-t border-slate-200 pt-6">
									<h3 className="text-sm font-semibold text-slate-950">
										Contact
									</h3>

									<div className="mt-3 flex flex-col gap-2 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:gap-6">
										{profile.contact.phone && (
											<a
												href={`tel:${profile.contact.phone}`}
												className="transition-colors hover:text-slate-950"
											>
												{profile.contact.phone}
											</a>
										)}

										{profile.contact.email && (
											<a
												href={`mailto:${profile.contact.email}`}
												className="transition-colors hover:text-slate-950"
											>
												{profile.contact.email}
											</a>
										)}
									</div>
								</div>
							)}
						</div>
					</div>
				</PageSection>

				<PageSection>
					<SectionHeader
						title="Offerings"
						description={`Published offerings from ${profile.name}.`}
						align="left"
					/>

					{offerings.length === 0 ? (
						<div className="mt-6">
							<LoadEmptyResponse message="This business has no published offerings right now." />
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

				<PageSection>
					<LoadExperience
						title="Continue exploring"
						message="Discover more businesses and offerings in the Marketplace."
						intent={PlatformIntents.intent.MARKETPLACE}
						actionLabel="Back to Marketplace"
					/>
				</PageSection>
			</div>
		</main>
	);
}
```

```jsx
`~\client\src\shared\components\LoadExperience.jsx`;

import { JourneyLink } from "../../platform/index.js";
import { Button } from "../index.js";

export default function LoadExperience({
	title = "Continue exploring",
	message = "Grasp on the first opportunity.",
	intent,
	actionLabel,
}) {
	return (
		<div className="rounded-2xl border border-slate-200 bg-white p-6">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h2 className="text-lg font-semibold text-slate-950">
						{title}
					</h2>
					<p className="mt-1 text-sm text-slate-600">{message}</p>
				</div>

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
		</div>
	);
}
```

```jsx
`~\client\src\applications\marketplace\components\BusinessCard.jsx`;

import { Link } from "react-router-dom";

export default function BusinessCard({ business }) {
	return (
		<Link
			to={`/marketplace/businesses/${encodeURIComponent(business.slug)}`}
			className="block"
		>
			<article className="h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
				<div className="flex items-start justify-between gap-4">
					<p className="text-xs font-medium uppercase tracking-wide text-slate-500">
						{business.businessType}
					</p>

					{business.verified && (
						<span className="text-xs font-medium text-slate-600">
							Verified
						</span>
					)}
				</div>

				<h3 className="mt-2 text-lg font-semibold text-slate-950">
					{business.name}
				</h3>

				{business.description && (
					<p className="mt-2 text-sm leading-6 text-slate-600">
						{business.description}
					</p>
				)}

				<p className="mt-4 text-sm font-medium text-slate-700">
					View business
				</p>
			</article>
		</Link>
	);
}
```

and

```http
GET {{baseUrl}}/marketplace/profiles/offerings/dell-xps-16
Accept: application/json
```

```js
// Response

{"success":true,"message":"Marketplace offering profile retrieved successfully.","data":{"id":"6a9675993aa7c3da250f7113","businessId":"6a9017d39104fee22462410a","type":"PRODUCT","name":"Dell XPS 16","slug":"dell-xps-16","shortDescription":"High-performance developer laptop","description":"Intel Core Ultra processor, 32GB RAM, 1TB SSD","visibility":"PUBLIC","featured":false,"metadata":{}}}
```
