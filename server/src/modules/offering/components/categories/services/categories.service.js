import mongoose from "mongoose";

import { categoriesFactory } from "../builders/index.js";
import { categoriesPresenter } from "../presenters/index.js";
import { categoriesRepository } from "../repositories/index.js";

import categoryService from "../../../../commerce/services/category.service.js";

import { HTTP_STATUS } from "../../../../../shared/constants/index.js";
import { AppError, ErrorCodes } from "../../../../../shared/errors/index.js";

import {
	ensureBusinessExists,
	ensureOfferingExists,
} from "../../shared/index.js";

/**
 * #### POST and DELETE?
 *
 * As per the AI's recommendation, adding them later merely to make the REST API look CRUD-complete would introduce unnecessary semantics.
 */
class CategoriesService {
	/**
	 * Ensures that the supplied category IDs are valid MongoDB ObjectIds.
	 */
	validateCategoryIds(categoryIds) {
		for (const categoryId of categoryIds) {
			if (!mongoose.Types.ObjectId.isValid(categoryId)) {
				throw new AppError(
					`Invalid category ID: ${categoryId}.`,
					HTTP_STATUS.BAD_REQUEST,
					ErrorCodes.BAD_REQUEST,
				);
			}
		}
	}

	/**
	 * Replaces all category assignments for an Offering.
	 *
	 * Validation of the categories payload is performed by the Categories Component before this service is invoked.
	 *
	 * Persistence is transactional:
	 *
	 * 1. Ensure business exists.
	 * 2. Ensure Offering exists within this business.
	 * 3. Validate category IDs
	 * 4. Ensure categories belong to the business.
	 * 5. Ensure categories are ACTIVE.
	 * 6. Start transaction.
	 * 7. Delete existing assignments.
	 * 8. Create new assignments.
	 * 9. Commit.
	 * 10. Return resulting assignments.
	 */
	async setCategories({ businessId, offeringId, categoryIds = [], actor }) {
		await ensureBusinessExists(businessId);

		await ensureOfferingExists(businessId, offeringId);

		const uniqueCategoryIds = [...new Set(categoryIds.map(String))];

		this.validateCategoryIds(uniqueCategoryIds);

		await categoryService.ensureAssignableCategories({
			businessId,
			categoryIds: uniqueCategoryIds,
		});

		const session = await mongoose.startSession();

		try {
			session.startTransaction();

			await categoriesRepository.deleteByOffering(offeringId, session);

			const assignments = uniqueCategoryIds.map((categoryId) =>
				categoriesFactory.createCategoryAssignment({
					businessId,
					offeringId,
					categoryId,
					actor,
				}),
			);

			const created = await categoriesRepository.createMany(
				assignments,
				session,
			);

			await session.commitTransaction();

			return categoriesPresenter.presentCollection(created);
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

		const assignments =
			await categoriesRepository.findByOffering(offeringId);

		return categoriesPresenter.presentCollection(assignments);
	}
}

export const categoriesService = new CategoriesService();

export default categoriesService;
