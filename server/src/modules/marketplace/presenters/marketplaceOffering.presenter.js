import { getId } from "../../../shared/index.js";

class MarketplacePresenter {
	present(offering) {
		if (!offering) {
			return null;
		}

		return {
			id: getId(offering),

			businessId: getId(offering.business),

			type: offering.type,

			name: offering.name,

			slug: offering.slug,

			shortDescription: offering.shortDescription,

			description: offering.description,

			visibility: offering.visibility,

			publishedAt: offering.publishedAt,

			featured: offering.featured,

			metadata: offering.metadata ?? {},
		};
	}

	presentCollection(result) {
		return {
			data: result.offerings.map((offering) => this.present(offering)),

			pagination: {
				total: result.total,
				page: result.page,
				limit: result.limit,
				totalPages: result.totalPages,
			},
		};
	}
}

export default new MarketplacePresenter();
