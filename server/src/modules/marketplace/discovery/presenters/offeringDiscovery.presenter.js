import { getId } from "../../../../shared/index.js";

class OfferingDiscoveryPresenter {
	present(offering) {
		if (!offering) {
			return null;
		}

		return {
			id: offering.id,
			businessId: getId(offering.business),
			type: offering.type,
			name: offering.name,
			slug: offering.slug,
			shortDescription: offering.shortDescription,
			description: offering.description,
			visibility: offering.visibility,
			featured: offering.featured,
			metadata: offering.metadata,
		};
	}

	presentCollection(result) {
		return {
			data: (result.offerings ?? []).map((offering) =>
				this.present(offering),
			),
			pagination: {
				total: result.total,
				page: result.page,
				limit: result.limit,
				totalPages: result.totalPages,
			},
		};
	}
}

export default new OfferingDiscoveryPresenter();
