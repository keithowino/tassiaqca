import { getId } from "../../../shared/utils/presenter.js";

class OfferingPresenter {
	present(offering) {
		if (!offering) return null;

		const businessId = getId(offering.business);

		return {
			id: offering.id,

			businessId,

			type: offering.type,

			slug: offering.slug,

			name: offering.name,

			shortDescription: offering.shortDescription,

			description: offering.description,

			status: offering.status,

			visibility: offering.visibility,

			searchable: offering.searchable,

			featured: offering.featured,

			publishedAt: offering.publishedAt,

			// categories: offering.categories ?? [],
			categories: offering.categories?.map(getId) ?? [],

			tags: offering.tags ?? [],

			media: offering.media ?? [],

			seo: offering.seo ?? {
				title: "",
				description: "",
				keywords: [],
				canonicalUrl: "",
				ogImage: "",
			},

			metadata: offering.metadata ?? {},

			createdAt: offering.createdAt,

			updatedAt: offering.updatedAt,
		};
	}

	presentCollection(offerings) {
		return offerings.map((offering) => this.present(offering));
	}
}

export default new OfferingPresenter();
