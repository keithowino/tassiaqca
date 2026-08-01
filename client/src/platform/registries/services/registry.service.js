import { request } from "../../api";

/**
 * #### Later it naturally becomes
 * class RegistryService {
 *
 *  getBusinessTypes() {}
 *
 *  getModules() {}
 *
 *  getCapabilities() {}
 *
 *  getPermissions() {}
 *
 *  getCountries() {}
 *
 * getCurrencies() {}
 *
 * }
 */
class RegistryService {
	async getBusinessTypes() {
		const response = await request.get("/platform/business-types");

		return response.data.data;
	}
}

export default new RegistryService();
