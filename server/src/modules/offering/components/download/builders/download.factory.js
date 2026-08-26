import DownloadBuilder from "./download.builder.js";

function createDownloadAssignment({ businessId, offeringId, data, actor }) {
	return new DownloadBuilder()
		.setBusiness(businessId)
		.setOffering(offeringId)
		.setAssets(data.assets)
		.setActive(data.active ?? true)
		.setMaximumDownloads(data.maximumDownloads)
		.setExpirationMinutes(data.expirationMinutes)
		.setCreatedBy(actor.id)
		.setUpdatedBy(actor.id)
		.build();
}

export default {
	createDownloadAssignment,
};
