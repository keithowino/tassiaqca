import mongoose from "mongoose";

import { categoriesFactory } from "../builders/index.js";
import { categoriesPresenter } from "../presenters/index.js";
import { categoriesRepository } from "../repositories/index.js";

import categoryService from "../../../../commerce/services/category.service.js";

class CategoriesService {
	/**
	 * Replaces all category assignments for an Offering.
	 *
	 * Categories are component-owned data.
	 * The Offering document itself is never modified.
	 */
	async setCategories({ businessId, offeringId, categoryIds = [], actor }) {
		const session = await mongoose.startSession();

		try {
			session.startTransaction();

			const uniqueCategoryIds = [...new Set(categoryIds.map(String))];

			await categoryService.ensureAssignableCategories({
				businessId,
				categoryIds: uniqueCategoryIds,
			});

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
