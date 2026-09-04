import { OfferingCategory } from "../models/index.js";

class CategoriesRepository {
	async create(data, session = null) {
		const [assignment] = await OfferingCategory.create([data], {
			session,
		});

		return assignment;
	}

	async createMany(data, session = null) {
		if (!data.length) {
			return [];
		}

		return OfferingCategory.insertMany(data, {
			session,
		});
	}

	async findByOffering(offeringId) {
		return OfferingCategory.find({
			offering: offeringId,
		})
			.populate("category")
			.sort({
				createdAt: 1,
			});
	}

	async findByOfferingAndCategory(offeringId, categoryId) {
		return OfferingCategory.findOne({
			offering: offeringId,
			category: categoryId,
		});
	}

	async findOfferingIdsByCategory(categoryId) {
		return OfferingCategory.find({
			category: categoryId,
		}).distinct("offering");
	}

	async deleteByOffering(offeringId, session = null) {
		return OfferingCategory.deleteMany(
			{
				offering: offeringId,
			},
			{
				session,
			},
		);
	}

	async deleteByOfferingAndCategories(
		offeringId,
		categoryIds,
		session = null,
	) {
		return OfferingCategory.deleteMany(
			{
				offering: offeringId,
				category: {
					$in: categoryIds,
				},
			},
			{
				session,
			},
		);
	}
}

export default new CategoriesRepository();
