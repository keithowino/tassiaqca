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
