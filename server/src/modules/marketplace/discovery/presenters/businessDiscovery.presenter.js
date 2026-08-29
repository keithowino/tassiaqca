/**
 * There is deliberate duplication between the Business public contract and the Marketplace representation
 * That is acceptable because they serve different ownership boundaries:
 */
class BusinessDiscoveryPresenter {
	present(business) {
		if (!business) {
			return null;
		}

		return {
			id: business.id,
			name: business.name,
			slug: business.slug,
			description: business.description,
			businessType: business.businessType,
			logo: business.logo,
			coverImage: business.coverImage,
			verified: business.verified,
		};
	}

	presentCollection({
		businesses = [],
		total = 0,
		page = 1,
		limit = 20,
		totalPages = 0,
	} = {}) {
		return {
			data: businesses.map((business) => this.present(business)),
			pagination: {
				total,
				page,
				limit,
				totalPages,
			},
		};
	}
}

export default new BusinessDiscoveryPresenter();
