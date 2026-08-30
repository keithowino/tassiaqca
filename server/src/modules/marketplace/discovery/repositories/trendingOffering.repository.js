import { offeringService } from "../../../offering/index.js";

async function findTrending(query = {}) {
	const { type, page = 1, limit = 20 } = query;

	const skip = (page - 1) * limit;

	const result = await offeringService.listTrendingForMarketplace({
		type,
		skip,
		limit,
	});

	return {
		offerings: result.data,
		total: result.total,
		page,
		limit,
		totalPages: Math.ceil(result.total / limit),
	};
}

export default {
	findTrending,
};
