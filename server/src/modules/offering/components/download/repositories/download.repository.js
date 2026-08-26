import OfferingDownload from "../models/download.model.js";

class DownloadRepository {
	async create(data) {
		return OfferingDownload.create(data);
	}

	async save(download) {
		return download.save();
	}

	async findByBusinessAndOffering(businessId, offeringId) {
		return OfferingDownload.findOne({
			business: businessId,
			offering: offeringId,
		});
	}
}

export const downloadRepository = new DownloadRepository();

export default downloadRepository;
