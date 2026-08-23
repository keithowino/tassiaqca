import { getId } from "../../../../../shared/index.js";

class LocationPresenter {
	present(location) {
		if (!location) {
			return null;
		}

		return {
			id: location.id,
			businessId: getId(location.business),
			offeringId: getId(location.offering),

			name: location.name,
			address: location.address,
			city: location.city,
			county: location.county,
			country: location.country,

			latitude: location.latitude,
			longitude: location.longitude,

			createdBy: getId(location.createdBy),
			updatedBy: getId(location.updatedBy),

			createdAt: location.createdAt,
			updatedAt: location.updatedAt,
		};
	}
}

export const locationPresenter = new LocationPresenter();

export default locationPresenter;
