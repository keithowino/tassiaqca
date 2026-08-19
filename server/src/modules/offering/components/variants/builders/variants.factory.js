import VariantsBuilder from "./variants.builder.js";

function createVariant({ businessId, offeringId, variant, actor }) {
	return new VariantsBuilder()
		.setBusiness(businessId)
		.setOffering(offeringId)
		.setSku(variant.sku)
		.setSlug(variant.slug)
		.setAttributes(variant.attributes)
		.setAttributeCount(variant.attributeCount)
		.setAttributeSignature(variant.attributeSignature)
		.setStatus(variant.status)
		.setCreatedBy(actor.id)
		.setUpdatedBy(actor.id)
		.build();
}

export default {
	createVariant,
};
