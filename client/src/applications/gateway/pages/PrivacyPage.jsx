import { Container } from "../../../shared/ui/index.js";

/**
 * A privacy policy is a legal/public document and should eventually describe the actual data practices of TASSIAQCA
 */
export default function PrivacyPage() {
	return (
		<section className="py-16 sm:py-20">
			<Container>
				<article className="mx-auto max-w-3xl">
					<p className="text-sm font-semibold uppercase tracking-wide text-orange-500">
						Legal
					</p>

					<h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
						Privacy Policy
					</h1>

					<p className="mt-6 text-base leading-7 text-slate-600">
						This page will contain the TassiaQCA Privacy Policy
						governing the collection, use, storage, protection, and
						handling of information within the platform.
					</p>

					<div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
						<p className="text-sm leading-7 text-slate-600">
							Privacy policy content is currently being prepared.
							The final policy will be published here before
							production use.
						</p>
					</div>
				</article>
			</Container>
		</section>
	);
}
