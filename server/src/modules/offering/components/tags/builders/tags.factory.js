import TagsBuilder from "./tags.builder.js";

function createTagAssignment({ businessId, offeringId, tag, actor }) {
	return new TagsBuilder()
		.setBusiness(businessId)
		.setOffering(offeringId)
		.setTag(tag)
		.setCreatedBy(actor.id)
		.setUpdatedBy(actor.id)
		.build();
}

export default {
	createTagAssignment,
};
