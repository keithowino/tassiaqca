import { offeringService } from "../../../offering/index.js";

/**
 * Marketplace Discovery source adapter for featured offerings.
 *
 * The Discovery layer does not query the Offering model directly.
 * It consumes the Offering domain's Marketplace-facing contract.
 */
async function findFeatured(query = {}) {
	const { page = 1, limit = 20 } = query;

	const skip = (page - 1) * limit;

	const result = await offeringService.listFeaturedForMarketplace({
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
	findFeatured,
};
