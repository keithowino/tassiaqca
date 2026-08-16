class SeoBuilder {
	constructor() {
		this.seo = {};
	}

	setBusiness(businessId) {
		this.seo.business = businessId;
		return this;
	}

	setOffering(offeringId) {
		this.seo.offering = offeringId;
		return this;
	}

	setTitle(title) {
		this.seo.title = title;
		return this;
	}

	setDescription(description) {
		this.seo.description = description;
		return this;
	}

	setKeywords(keywords = []) {
		this.seo.keywords = keywords;
		return this;
	}

	setCanonicalUrl(canonicalUrl) {
		this.seo.canonicalUrl = canonicalUrl;
		return this;
	}

	setOgImage(ogImage) {
		this.seo.ogImage = ogImage;
		return this;
	}

	setCreatedBy(userId) {
		this.seo.createdBy = userId;
		return this;
	}

	setUpdatedBy(userId) {
		this.seo.updatedBy = userId;
		return this;
	}

	build() {
		return Object.freeze({
			...this.seo,
		});
	}
}

export default SeoBuilder;
