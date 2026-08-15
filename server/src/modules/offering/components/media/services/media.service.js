import mongoose from "mongoose";

import { mediaFactory } from "../builders/index.js";
import { mediaPresenter } from "../presenters/index.js";
import { mediaRepository } from "../repositories/index.js";

import { offeringRepository } from "../../../repositories/index.js";
import businessService from "../../../../business/services/business.service.js";

import { HTTP_STATUS } from "../../../../../shared/constants/index.js";
import { AppError, ErrorCodes } from "../../../../../shared/errors/index.js";

class MediaService {
	async ensureOfferingExists(businessId, offeringId) {
		const offering = await offeringRepository.findByBusinessAndId(
			businessId,
			offeringId,
		);

		if (!offering) {
			throw new AppError(
				"Offering not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		return offering;
	}

	/**
	 * Replaces the complete media collection for an Offering.
	 *
	 * Media assets themselves belong to the Files platform service.
	 * This service only persists the Offering -> media asset relationship
	 * and Offering-specific presentation metadata.
	 */
	async setMedia({ businessId, offeringId, media = [], actor }) {
		/**
		 * 1. Ensure business exists.
		 */
		await businessService.ensureExists(businessId);

		/**
		 * 2. Ensure Offering exists within this business.
		 */
		await this.ensureOfferingExists(businessId, offeringId);

		// /**
		//  * 3. Normalize media collection.
		//  */
		// const normalizedMedia = media.map((item, index) => ({
		// 	...item,
		// 	position: item.position ?? index,
		// 	alt: item.alt?.trim() ?? "",
		// 	title: item.title?.trim() ?? "",
		// 	featured: item.featured ?? false,
		// 	metadata: item.metadata ?? {},
		// }));

		/**
		 * 4. Start transaction.
		 */
		const session = await mongoose.startSession();

		try {
			session.startTransaction();

			/**
			 * 5. Remove existing media assignments.
			 */
			await mediaRepository.deleteByOffering(offeringId, session);

			/**
			 * 6. Build new assignments.
			 */
			// const assignments = normalizedMedia.map((item) =>
			// 	mediaFactory.createMediaAssignment({
			// 		businessId,
			// 		offeringId,
			// 		data: item,
			// 		actor,
			// 	}),
			// );
			const assignments = media.map((item) =>
				mediaFactory.createMediaAssignment({
					businessId,
					offeringId,
					data: item,
					actor,
				}),
			);

			/**
			 * 7. Persist assignments.
			 */
			const created = await mediaRepository.createMany(
				assignments,
				session,
			);

			/**
			 * 8. Commit.
			 */
			await session.commitTransaction();

			/**
			 * 9. Return resulting media assignments.
			 */
			return mediaPresenter.presentCollection(created);
		} catch (error) {
			await session.abortTransaction();
			throw error;
		} finally {
			await session.endSession();
		}
	}

	async getByOffering(offeringId) {
		const media = await mediaRepository.findByOffering(offeringId);

		return mediaPresenter.presentCollection(media);
	}
}

export const mediaService = new MediaService();

export default mediaService;
