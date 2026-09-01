import { offeringService } from "../../../../offering/index.js";

async function findPublishedBySlug(slug) {
	return offeringService.findPublishedForMarketplaceBySlug(slug);
}

export default {
	findPublishedBySlug,
};
