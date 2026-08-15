class AttributesPresenter {
	present(attribute) {
		if (!attribute) {
			return null;
		}

		return {
			id: attribute.id,
			business: attribute.business,
			offering: attribute.offering,
			name: attribute.name,
			values: [...attribute.values],
			createdBy: attribute.createdBy,
			updatedBy: attribute.updatedBy,
			createdAt: attribute.createdAt,
			updatedAt: attribute.updatedAt,
		};
	}

	presentCollection(attributes = []) {
		return attributes.map((attribute) => this.present(attribute));
	}
}

export default new AttributesPresenter();
