import { businessService } from "../../../business/index.js";

async function search(query = {}) {
	const { search, businessType, page = 1, limit = 20 } = query;

	const skip = (page - 1) * limit;

	const result = await businessService.listPublishedForMarketplace({
		search,
		businessType,
		skip,
		limit,
	});

	return {
		businesses: result.data,
		total: result.total,
		page,
		limit,
		totalPages: Math.ceil(result.total / limit),
	};
}

export default {
	search,
};
