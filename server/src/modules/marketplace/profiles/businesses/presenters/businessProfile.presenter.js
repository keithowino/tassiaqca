import { getId } from "../../../../../shared/index.js";

class BusinessProfilePresenter {
	present(business, offerings = []) {
		if (!business) {
			return null;
		}

		return {
			id: getId(business),
			name: business.name,
			slug: business.slug,
			description: business.description ?? "",
			businessType: business.businessType,
			branding: {
				logo: business.logo ?? null,
				coverImage: business.coverImage ?? null,
			},
			contact: {
				phone: business.phone ?? null,
				email: business.email ?? null,
			},
			verified: Boolean(business.verified),
			offerings,
		};
	}
}

export default new BusinessProfilePresenter();
