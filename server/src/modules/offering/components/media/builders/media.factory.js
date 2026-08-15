import MediaBuilder from "./media.builder.js";

function createMediaAssignment({ businessId, offeringId, data, actor }) {
	return new MediaBuilder()
		.setBusiness(businessId)
		.setOffering(offeringId)
		.setAssetId(data.assetId)
		.setType(data.type)
		.setUrl(data.url)
		.setAlt(data.alt ?? "")
		.setTitle(data.title ?? "")
		.setPosition(data.position ?? 0)
		.setFeatured(data.featured ?? false)
		.setMetadata(data.metadata ?? {})
		.setCreatedBy(actor.id)
		.setUpdatedBy(actor.id)
		.build();
}

export default {
	createMediaAssignment,
};
