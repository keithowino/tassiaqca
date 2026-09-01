import { businessRepository } from "../../../../business/index.js";
import { offeringService } from "../../../../offering/index.js";

async function findBusinessBySlug(slug) {
	return businessRepository.findBySlug(slug);
}

async function findPublishedOfferings(
	businessId,
	{ skip = 0, limit = 20 } = {},
) {
	const result = await offeringService.listPublishedForMarketplace({
		businessId,
		skip,
		limit,
	});

	return result;
}

export default {
	findBusinessBySlug,
	findPublishedOfferings,
};
