export function normalizeSeo(seo = {}) {
	return {
		title: seo.title?.trim() ?? "",

		description: seo.description?.trim() ?? "",

		keywords: seo.keywords
			? [
					...new Set(
						seo.keywords.map((keyword) =>
							keyword.trim().toLowerCase(),
						),
					),
				]
			: [],

		canonicalUrl: seo.canonicalUrl?.trim() ?? "",

		ogImage: seo.ogImage?.trim() ?? "",
	};
}
