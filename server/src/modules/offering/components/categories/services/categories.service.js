import mongoose from "mongoose";

import { categoriesFactory } from "../builders/index.js";
import { categoriesPresenter } from "../presenters/index.js";
import { categoriesRepository } from "../repositories/index.js";

import categoryService from "../../../../commerce/services/category.service.js";

import { offeringRepository } from "../../../repositories/index.js";

import businessService from "../../../../business/services/business.service.js";

import { HTTP_STATUS } from "../../../../../shared/constants/index.js";
import { AppError, ErrorCodes } from "../../../../../shared/errors/index.js";

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
	 * Ensures that the Offering exists and belongs to the supplied business.
	 */
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
	 * Replaces all category assignments for an Offering.
	 *
	 * Categories are component-owned data.
	 * The Offering document itself is never modified.
	 *
	 * Validation is deliberately completed before the transaction begins.
	 * The transaction therefore only contains the persistence operation.
	 */
	async setCategories({ businessId, offeringId, categoryIds = [], actor }) {
		/**
		 * 1. Ensure business exists.
		 */
		await businessService.ensureExists(businessId);

		/**
		 * 2. Ensure Offering exists within this business.
		 */
		await this.ensureOfferingExists(businessId, offeringId);

		/**
		 * Normalize and deduplicate IDs.
		 */
		const uniqueCategoryIds = [...new Set(categoryIds.map(String))];

		/**
		 * 3. Validate category IDs
		 */
		this.validateCategoryIds(uniqueCategoryIds);

		/**
		 * 4. Ensure categories belong to the business.
		 * 5. Ensure categories are ACTIVE.
		 */
		await categoryService.ensureAssignableCategories({
			businessId,
			categoryIds: uniqueCategoryIds,
		});

		/**
		 * 6. Start transaction.
		 */
		const session = await mongoose.startSession();

		try {
			session.startTransaction();

			/**
			 * 7. Delete existing assignments.
			 */
			await categoriesRepository.deleteByOffering(offeringId, session);

			/**
			 * 8. Create new assignments.
			 */
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

			/**
			 * 9. Commit.
			 */
			await session.commitTransaction();

			/**
			 * 10. Return resulting assignments.
			 */
			return categoriesPresenter.presentCollection(created);
		} catch (error) {
			await session.abortTransaction();
			throw error;
		} finally {
			await session.endSession();
		}
	}

	/**
	 * Returns all categories assigned to an Offering.
	 */
	async getByOffering(offeringId) {
		const assignments =
			await categoriesRepository.findByOffering(offeringId);

		return categoriesPresenter.presentCollection(assignments);
	}
}

export const categoriesService = new CategoriesService();

export default categoriesService;
