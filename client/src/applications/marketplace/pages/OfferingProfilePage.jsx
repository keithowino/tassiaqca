import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

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
		"Unable to load this offering right now."
	);
}

function getProfile(response) {
	return response?.data?.data ?? null;
}

export default function OfferingProfilePage() {
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
					await marketplaceService.getOfferingProfile(slug);

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
		return <LoadingScreen message="Loading offering..." />;
	}

	if (error) {
		return (
			<LoadError
				error={error}
				message="Unable to load this offering."
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
				message="This offering could not be found."
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
				badgeText="Offering Profile"
				description={
					profile.shortDescription ||
					"View details about this Marketplace offering."
				}
				headBack={true}
				to="/marketplace"
				title={profile.name}
			>
				Marketplace
			</SeedHeader>

			<div className="mt-8 space-y-12">
				<PageSection>
					<div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
						<div className="flex flex-wrap items-center gap-3">
							<span className="text-xs font-medium uppercase tracking-wide text-slate-500">
								{profile.type}
							</span>

							{profile.featured && (
								<span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
									Featured
								</span>
							)}

							{profile.visibility && (
								<span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
									{profile.visibility}
								</span>
							)}
						</div>

						<h2 className="mt-3 text-3xl font-semibold text-slate-950">
							{profile.name}
						</h2>

						{profile.shortDescription && (
							<p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
								{profile.shortDescription}
							</p>
						)}
					</div>
				</PageSection>

				<PageSection>
					<SectionHeader
						title="About this offering"
						description="Details provided by the offering."
						align="left"
					/>

					{profile.description ? (
						<div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
							<p className="whitespace-pre-line text-sm leading-7 text-slate-600">
								{profile.description}
							</p>
						</div>
					) : (
						<div className="mt-6">
							<LoadEmptyResponse message="No additional description is available for this offering." />
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
