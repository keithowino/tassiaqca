import digitalDownloadRepository from "../repositories/digitalDownload.repository.js";

import { projectionContract } from "../../offering/projections/index.js";

function mapOfferingToProjection(offering, actor) {
	return {
		business: offering.business,

		offering: offering.id,

		createdBy: actor.id,

		updatedBy: actor.id,
	};
}

async function create(context) {
	const { offering, actor, data } = context;

	return digitalDownloadRepository.create({
		...mapOfferingToProjection(offering, actor),

		fileUrl: data.fileUrl ?? "",

		fileName: data.fileName ?? "",

		fileSize: data.fileSize ?? 0,

		mimeType: data.mimeType ?? "",

		version: data.version ?? "",

		downloadLimit: data.downloadLimit ?? null,

		expiresAt: data.expiresAt ?? null,
	});
}

async function find(offeringId) {
	return digitalDownloadRepository.findByOffering(offeringId);
}

async function update(context) {
	const { digitalDownload, actor, data } = context;

	if (!digitalDownload) {
		return null;
	}

	if (data.fileUrl !== undefined) {
		digitalDownload.fileUrl = data.fileUrl;
	}

	if (data.fileName !== undefined) {
		digitalDownload.fileName = data.fileName;
	}

	if (data.fileSize !== undefined) {
		digitalDownload.fileSize = data.fileSize;
	}

	if (data.mimeType !== undefined) {
		digitalDownload.mimeType = data.mimeType;
	}

	if (data.version !== undefined) {
		digitalDownload.version = data.version;
	}

	if (data.downloadLimit !== undefined) {
		digitalDownload.downloadLimit = data.downloadLimit;
	}

	if (data.expiresAt !== undefined) {
		digitalDownload.expiresAt = data.expiresAt;
	}

	digitalDownload.updatedBy = actor.id;

	return digitalDownloadRepository.save(digitalDownload);
}

async function archive() {
	return null;
}

async function restore() {
	return null;
}

export default {
	...projectionContract,

	find,

	create,

	update,

	archive,

	restore,
};
