import { Container } from "../../../shared/ui/index.js";

export default function TermsPage() {
	return (
		<section className="py-16 sm:py-20">
			<Container>
				<article className="mx-auto max-w-3xl">
					<p className="text-sm font-semibold uppercase tracking-wide text-orange-500">
						Legal
					</p>

					<h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
						Terms of Service
					</h1>

					<p className="mt-6 text-base leading-7 text-slate-600">
						This page will contain the terms governing access to and
						use of the TassiaQCA platform, marketplace, and related
						services.
					</p>

					<div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
						<p className="text-sm leading-7 text-slate-600">
							Terms of Service content is currently being
							prepared. The final terms will be published here
							before production use.
						</p>
					</div>
				</article>
			</Container>
		</section>
	);
}
