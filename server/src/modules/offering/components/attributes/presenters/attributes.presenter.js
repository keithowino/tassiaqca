import { getId } from "../../../../../shared/index.js";

class AttributesPresenter {
	present(attribute) {
		if (!attribute) {
			return null;
		}

		return {
			id: attribute.id,
			business: getId(attribute.business),
			offering: getId(attribute.offering),
			name: attribute.name,
			values: [...attribute.values],
			createdBy: attribute.createdBy,
			updatedBy: attribute.updatedBy,
			createdAt: attribute.createdAt,
			updatedAt: attribute.updatedAt,
		};
	}

	presentCollection(attributes = []) {
		return attributes.map((item) => this.present(item));
	}
}

export const attributesPresenter = new AttributesPresenter();

export default attributesPresenter;
