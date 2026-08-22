import { getId } from "../../../../../shared/index.js";

class CapacityPresenter {
	present(capacity) {
		if (!capacity) {
			return null;
		}

		return {
			id: capacity.id,
			businessId: getId(capacity.business),
			offeringId: getId(capacity.offering),
			limit: capacity.limit,
			createdBy: getId(capacity.createdBy),
			updatedBy: getId(capacity.updatedBy),
			createdAt: capacity.createdAt,
			updatedAt: capacity.updatedAt,
		};
	}
}

export const capacityPresenter = new CapacityPresenter();

export default capacityPresenter;
