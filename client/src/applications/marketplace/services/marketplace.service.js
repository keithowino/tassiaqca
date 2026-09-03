import { request } from "../../../platform/api/index.js";

const MARKETPLACE_BASE_URL = "/marketplace";

class MarketplaceService {
	// ! GUIDE
	// async listBusinesses() {
	// 	const { data } = await request.get("/businesses");

	// 	return data.data;
	// }

	async getOfferings(params = {}) {
		return request.get(`${MARKETPLACE_BASE_URL}/offerings`, {
			params,
		});
	}

	async getDiscoveryBusinesses(params = {}) {
		return request.get(`${MARKETPLACE_BASE_URL}/discovery/businesses`, {
			params,
		});
	}

	async getFeaturedOfferings(params = {}) {
		return request.get(
			`${MARKETPLACE_BASE_URL}/discovery/offerings/featured`,
			{
				params,
			},
		);
	}

	async getTrendingOfferings(params = {}) {
		return request.get(
			`${MARKETPLACE_BASE_URL}/discovery/offerings/trending`,
			{
				params,
			},
		);
	}

	async search(params = {}) {
		return request.get(`${MARKETPLACE_BASE_URL}/search`, {
			params,
		});
	}

	async getCategories(params = {}) {
		return request.get(`${MARKETPLACE_BASE_URL}/categories`, {
			params,
		});
	}

	async getBusinessProfile(slug) {
		return request.get(
			`${MARKETPLACE_BASE_URL}/profiles/businesses/${encodeURIComponent(slug)}`,
		);
	}

	async getOfferingProfile(slug) {
		return request.get(
			`${MARKETPLACE_BASE_URL}/profiles/offerings/${encodeURIComponent(slug)}`,
		);
	}
}

export default new MarketplaceService();
