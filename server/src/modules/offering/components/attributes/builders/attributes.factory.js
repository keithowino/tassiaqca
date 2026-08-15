import AttributesBuilder from "./attributes.builder.js";

function createAttribute({ businessId, offeringId, attribute, actor }) {
	return new AttributesBuilder()
		.setBusiness(businessId)
		.setOffering(offeringId)
		.setName(attribute.name)
		.setValues(attribute.values)
		.setCreatedBy(actor.id)
		.setUpdatedBy(actor.id)
		.build();
}

export default {
	createAttribute,
};
