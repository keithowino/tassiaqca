import { request } from "../../../platform/api/index.js";

const MARKETPLACE_BASE_URL = "/marketplace";

class MarketplaceService {
	getOfferings(params = {}) {
		return request.get(`${MARKETPLACE_BASE_URL}/offerings`, {
			params,
		});
	}

	getDiscovery(params = {}) {
		return request.get(`${MARKETPLACE_BASE_URL}/discovery`, {
			params,
		});
	}

	search(params = {}) {
		return request.get(`${MARKETPLACE_BASE_URL}/search`, {
			params,
		});
	}

	getCategories(params = {}) {
		return request.get(`${MARKETPLACE_BASE_URL}/categories`, {
			params,
		});
	}

	getBusinessProfile(slug) {
		return request.get(
			`${MARKETPLACE_BASE_URL}/profiles/businesses/${encodeURIComponent(slug)}`,
		);
	}

	getOfferingProfile(slug) {
		return request.get(
			`${MARKETPLACE_BASE_URL}/profiles/offerings/${encodeURIComponent(slug)}`,
		);
	}
}

export default new MarketplaceService();
