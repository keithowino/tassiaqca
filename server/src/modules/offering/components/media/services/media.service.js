import mongoose from "mongoose";

import { mediaFactory } from "../builders/index.js";
import { mediaPresenter } from "../presenters/index.js";
import { mediaRepository } from "../repositories/index.js";

import { offeringRepository } from "../../../repositories/index.js";
import businessService from "../../../../business/services/business.service.js";

import { HTTP_STATUS } from "../../../../../shared/constants/index.js";
import { AppError, ErrorCodes } from "../../../../../shared/errors/index.js";

import {
	ensureBusinessExists,
	ensureOfferingExists,
} from "../../shared/index.js";

class MediaService {
	/**
	 * Replaces the complete media collection for an Offering.
	 *
	 * Media assets themselves belong to the Files platform service.
	 * This service only persists the Offering -> media asset relationship
	 * and Offering-specific presentation metadata.
	 */

	/**
	 * Replaces the complete media collection for an Offering.
	 *
	 * Media assets themselves belong to the Files platform service.
	 * This service only persists the Offering -> media asset relationship and Offering-specific presentation metadata.
	 *
	 * Persistence is transactional:
	 *
	 * 1. Ensure business exists.
	 * 2. Ensure Offering exists within this business.
	 * 3. Start transaction.
	 * 4. Remove existing media assignments.
	 * 5. Build new assignments.
	 * 6. Persist assignments.
	 * 7. Commit transaction.
	 * 8. Return resulting media assignments.
	 */
	async setMedia({ businessId, offeringId, media = [], actor }) {
		await ensureBusinessExists(businessId);

		await ensureOfferingExists(businessId, offeringId);

		const session = await mongoose.startSession();

		try {
			session.startTransaction();

			await mediaRepository.deleteByOffering(offeringId, session);

			const assignments = media.map((item) =>
				mediaFactory.createMediaAssignment({
					businessId,
					offeringId,
					data: item,
					actor,
				}),
			);

			const created = await mediaRepository.createMany(
				assignments,
				session,
			);

			await session.commitTransaction();

			return mediaPresenter.presentCollection(created);
		} catch (error) {
			await session.abortTransaction();
			throw error;
		} finally {
			await session.endSession();
		}
	}

	async getByOffering(businessId, offeringId) {
		await ensureBusinessExists(businessId);

		await ensureOfferingExists(businessId, offeringId);

		const media = await mediaRepository.findByOffering(offeringId);

		return mediaPresenter.presentCollection(media);
	}
}

export const mediaService = new MediaService();

export default mediaService;
