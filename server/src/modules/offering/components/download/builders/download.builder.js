class DownloadBuilder {
	constructor() {
		this.data = {};
	}

	setBusiness(businessId) {
		this.data.business = businessId;
		return this;
	}

	setOffering(offeringId) {
		this.data.offering = offeringId;
		return this;
	}

	setAssets(assets) {
		this.data.assets = assets;
		return this;
	}

	setActive(active) {
		this.data.active = active;
		return this;
	}

	setMaximumDownloads(maximumDownloads) {
		this.data.maximumDownloads = maximumDownloads ?? null;
		return this;
	}

	setExpirationMinutes(expirationMinutes) {
		this.data.expirationMinutes = expirationMinutes ?? null;
		return this;
	}

	setCreatedBy(userId) {
		this.data.createdBy = userId;
		return this;
	}

	setUpdatedBy(userId) {
		this.data.updatedBy = userId;
		return this;
	}

	build() {
		return this.data;
	}
}

export default DownloadBuilder;
