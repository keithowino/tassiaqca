import { getId } from "../../../../../shared/utils/presenter.js";

class SEOPresenter {
	present(seo) {
		if (!seo) {
			return null;
		}

		return {
			id: seo.id,

			business: getId(seo.business),

			offering: getId(seo.offering),

			title: seo.title,

			description: seo.description,

			keywords: seo.keywords,

			canonicalUrl: seo.canonicalUrl,

			ogImage: seo.ogImage,

			createdBy: seo.createdBy,

			updatedBy: seo.updatedBy,

			createdAt: seo.createdAt,

			updatedAt: seo.updatedAt,
		};
	}
}

export const seoPresenter = new SEOPresenter();

export default seoPresenter;
