import { offeringService } from "../../../offering/index.js";

async function findPublished(query = {}) {
	const { search, type, page = 1, limit = 20 } = query;

	const skip = (page - 1) * limit;

	const result = await offeringService.listPublishedForMarketplace({
		type,
		search,
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
	findPublished,
};
