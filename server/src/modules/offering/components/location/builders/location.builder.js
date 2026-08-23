class LocationBuilder {
	constructor() {
		this.location = {};
	}

	setBusiness(businessId) {
		this.location.business = businessId;
		return this;
	}

	setOffering(offeringId) {
		this.location.offering = offeringId;
		return this;
	}

	setName(name) {
		this.location.name = name;
		return this;
	}

	setAddress(address) {
		this.location.address = address;
		return this;
	}

	setCity(city) {
		this.location.city = city;
		return this;
	}

	setCounty(county) {
		this.location.county = county;
		return this;
	}

	setCountry(country) {
		this.location.country = country;
		return this;
	}

	setLatitude(latitude) {
		this.location.latitude = latitude;
		return this;
	}

	setLongitude(longitude) {
		this.location.longitude = longitude;
		return this;
	}

	setCreatedBy(userId) {
		this.location.createdBy = userId;
		return this;
	}

	setUpdatedBy(userId) {
		this.location.updatedBy = userId ?? null;
		return this;
	}

	build() {
		return Object.freeze({
			...this.location,
		});
	}
}

export default LocationBuilder;
