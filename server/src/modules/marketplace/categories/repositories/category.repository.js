import { categoryService } from "../../../commerce/index.js";

async function findPublished(query = {}) {
	const { search, businessId, parentId, page = 1, limit = 20 } = query;

	const skip = (page - 1) * limit;

	const result = await categoryService.listForMarketplace({
		search,
		businessId,
		parentId,
		skip,
		limit,
	});

	return {
		categories: result.data,
		total: result.total,
		page,
		limit,
		totalPages: Math.ceil(result.total / limit),
	};
}

export default {
	findPublished,
};
