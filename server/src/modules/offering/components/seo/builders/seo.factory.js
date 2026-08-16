import SeoBuilder from "./seo.builder.js";

function createSeo({ businessId, offeringId, data, actor }) {
	return new SeoBuilder()
		.setBusiness(businessId)
		.setOffering(offeringId)
		.setTitle(data.title ?? "")
		.setDescription(data.description ?? "")
		.setKeywords(data.keywords ?? [])
		.setCanonicalUrl(data.canonicalUrl ?? "")
		.setOgImage(data.ogImage ?? "")
		.setCreatedBy(actor.id)
		.setUpdatedBy(actor.id)
		.build();
}

export default {
	createSeo,
};
