class MediaBuilder {
	constructor() {
		this.media = {};
	}

	setBusiness(businessId) {
		this.media.business = businessId;
		return this;
	}

	setOffering(offeringId) {
		this.media.offering = offeringId;
		return this;
	}

	setAssetId(assetId) {
		this.media.assetId = assetId;
		return this;
	}

	setType(type) {
		this.media.type = type;
		return this;
	}

	setUrl(url) {
		this.media.url = url;
		return this;
	}

	setAlt(alt) {
		this.media.alt = alt;
		return this;
	}

	setTitle(title) {
		this.media.title = title;
		return this;
	}

	setPosition(position) {
		this.media.position = position;
		return this;
	}

	setFeatured(featured) {
		this.media.featured = featured;
		return this;
	}

	setMetadata(metadata) {
		this.media.metadata = metadata;
		return this;
	}

	setCreatedBy(userId) {
		this.media.createdBy = userId;
		return this;
	}

	setUpdatedBy(userId) {
		this.media.updatedBy = userId;
		return this;
	}

	build() {
		return Object.freeze({
			...this.media,
		});
	}
}

export default MediaBuilder;
