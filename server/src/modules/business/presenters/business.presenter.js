class BusinessPresenter {
	/**
	 * internal Business-domain API
	 */
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
			phone: business.phone,
			email: business.email,
			verified: business.verified,
			active: business.active,
			createdAt: business.createdAt,
			updatedAt: business.updatedAt,
		};
	}

	/**
	 * Business-owned public contract
	 *
	 * We are deliberately not exposing:
	 * - phone
	 * - email
	 * - active
	 * through the Marketplace contract.active is an operational eligibility field, not customer-facing business information.
	 */
	presentPublic(business) {
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

	presentCollection(businesses = []) {
		return businesses.map((business) => this.present(business));
	}

	presentPublicCollection(businesses = []) {
		return businesses.map((business) => this.presentPublic(business));
	}
}

export default new BusinessPresenter();
