import { offeringService } from "../../offering/index.js";

/**
 * This repository is intentionally acting as the Marketplace source adapter.
 */

async function findPublished(query = {}) {
	const { type, search, page = 1, limit = 20 } = query;

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
