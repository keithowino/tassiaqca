import { getId } from "../../../../../shared/index.js";

class DownloadPresenter {
	present(download) {
		if (!download) {
			return null;
		}

		return {
			id: download.id,
			businessId: getId(download.business),
			offeringId: getId(download.offering),
			assets: download.assets,
			active: download.active,
			maximumDownloads: download.maximumDownloads,
			expirationMinutes: download.expirationMinutes,
			createdBy: getId(download.createdBy),
			updatedBy: getId(download.updatedBy),
			createdAt: download.createdAt,
			updatedAt: download.updatedAt,
		};
	}
}

export const downloadPresenter = new DownloadPresenter();

export default downloadPresenter;
