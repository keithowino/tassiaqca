import { businessService } from "../../../business/index.js";

/**
 * Marketplace adapter for publicly discoverable businesses.
 *
 * Business remains the authoritative owner of business data
 * and determines which businesses are eligible for publication.
 */
async function findPublished(query = {}) {
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
	findPublished,
};
