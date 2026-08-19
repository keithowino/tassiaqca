import mongoose from "mongoose";

import { tagsFactory } from "../builders/index.js";
import { tagsPresenter } from "../presenters/index.js";
import { tagsRepository } from "../repositories/index.js";

import {
	ensureBusinessExists,
	ensureOfferingExists,
} from "../../shared/index.js";

import { normalizeTags } from "../validators/index.js";

class TagsService {
	/**
	 * Replaces the complete tag collection for an Offering.
	 *
	 * The Tags Component is responsible for validation and normalization
	 * before this service is invoked.
	 *
	 * Persistence is transactional:
	 *
	 * 1. Ensure business exists.
	 * 2. Ensure Offering exists within this business.
	 * 3. Start transaction.
	 * 4. Delete existing tag assignments.
	 * 5. Create new assignments.
	 * 6. Commit.
	 * 7. Return resulting tags.
	 */
	async setTags({ businessId, offeringId, tags = [], actor }) {
		await ensureBusinessExists(businessId);

		await ensureOfferingExists(businessId, offeringId);

		const normalizedTags = normalizeTags(tags);

		const session = await mongoose.startSession();

		try {
			session.startTransaction();

			await tagsRepository.deleteByOffering(offeringId, session);

			const assignments = normalizedTags.map((tag) =>
				tagsFactory.createTagAssignment({
					businessId,
					offeringId,
					tag,
					actor,
				}),
			);

			const created = await tagsRepository.createMany(
				assignments,
				session,
			);

			await session.commitTransaction();

			return tagsPresenter.presentCollection(created);
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

		const tags = await tagsRepository.findByOffering(offeringId);

		return tagsPresenter.presentCollection(tags);
	}
}

export const tagsService = new TagsService();

export default tagsService;
