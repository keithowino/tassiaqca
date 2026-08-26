import {
	ensureBusinessExists,
	ensureOfferingExists,
} from "../../shared/index.js";

import {
	AUDIT_ACTIONS,
	AUDIT_ENTITY_TYPES,
	ensureOfferingSupportsComponent,
	OFFERING_COMPONENTS,
} from "../../../../../shared/index.js";

import { auditLogService } from "../../../../audit/index.js";

import { downloadFactory } from "../builders/index.js";

import { downloadPresenter } from "../presenters/index.js";

import { downloadRepository } from "../repositories/index.js";

class DownloadService {
	ensureDownloadSupported(offering) {
		return ensureOfferingSupportsComponent(
			offering,
			OFFERING_COMPONENTS.DOWNLOAD,
			"Download is not supported for this offering.",
		);
	}

	buildAuditMetadata(download) {
		return {
			offeringId: download.offering,
			downloadId: download.id,
			assets: download.assets,
			active: download.active,
			maximumDownloads: download.maximumDownloads,
			expirationMinutes: download.expirationMinutes,
		};
	}

	async setDownload({
		businessId,
		offeringId,
		data,
		actor,
		requestMetadata,
	}) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureDownloadSupported(offering);

		let download = await downloadRepository.findByBusinessAndOffering(
			businessId,
			offeringId,
		);

		if (!download) {
			const assignment = downloadFactory.createDownloadAssignment({
				businessId,
				offeringId,
				data,
				actor,
			});

			download = await downloadRepository.create(assignment);

			await auditLogService.log({
				business: businessId,
				entityType: AUDIT_ENTITY_TYPES.OFFERING_DOWNLOAD,
				entityId: download.id,
				action: AUDIT_ACTIONS.OFFERING_DOWNLOAD_CREATED,
				actor,
				requestMetadata,
				metadata: this.buildAuditMetadata(download),
			});
		} else {
			if (data.assets !== undefined) {
				download.assets = data.assets;
			}

			if (data.active !== undefined) {
				download.active = data.active;
			}

			if (data.maximumDownloads !== undefined) {
				download.maximumDownloads = data.maximumDownloads;
			}

			if (data.expirationMinutes !== undefined) {
				download.expirationMinutes = data.expirationMinutes;
			}

			download.updatedBy = actor.id;

			await downloadRepository.save(download);

			await auditLogService.log({
				business: businessId,
				entityType: AUDIT_ENTITY_TYPES.OFFERING_DOWNLOAD,
				entityId: download.id,
				action: AUDIT_ACTIONS.OFFERING_DOWNLOAD_UPDATED,
				actor,
				requestMetadata,
				metadata: this.buildAuditMetadata(download),
			});
		}

		return downloadPresenter.present(download);
	}

	async getDownload(businessId, offeringId) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureDownloadSupported(offering);

		const download = await downloadRepository.findByBusinessAndOffering(
			businessId,
			offeringId,
		);

		return downloadPresenter.present(download);
	}
}

export const downloadService = new DownloadService();

export default downloadService;
