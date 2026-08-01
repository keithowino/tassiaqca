import { request } from "../../../../platform/api";

class BusinessService {
	async listBusinesses() {
		const { data } = await request.get("/businesses");

		return data.data;
	}

	async getBusiness(businessId) {
		const { data } = await request.get(`/businesses/${businessId}`);

		return data.data;
	}
}

export default new BusinessService();
