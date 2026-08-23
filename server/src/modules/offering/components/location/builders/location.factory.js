import LocationBuilder from "./location.builder.js";

function createLocationAssignment({ businessId, offeringId, data, actor }) {
	return new LocationBuilder()
		.setBusiness(businessId)
		.setOffering(offeringId)
		.setName(data.name ?? "")
		.setAddress(data.address ?? "")
		.setCity(data.city ?? "")
		.setCounty(data.county ?? "Kenya")
		.setLatitude(data.latitude ?? null)
		.setLongitude(data.longitude ?? null)
		.setCreatedBy(actor.id)
		.setUpdatedBy(actor.id)
		.build();
}

export default {
	createLocationAssignment,
};
