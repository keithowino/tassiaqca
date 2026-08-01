import { request } from "../../../../platform/api";

class OnboardingService {
	async createBusiness(payload) {
		const response = await request.post("/businesses", payload);

		return response.data.data;
	}
}

export default new OnboardingService();
