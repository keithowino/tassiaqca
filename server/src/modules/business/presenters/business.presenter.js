class BusinessPresenter {
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

	presentMany(businesses = []) {
		return businesses.map((business) => this.present(business));
	}
}

export default new BusinessPresenter();
