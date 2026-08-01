import workspaceApi from "../api/workspace.api";
import { me } from "../../identity/identity.service";

class ProvisioningService {
	async provisionWorkspace(businessId) {
		const user = await me();

		const [
			userResponse,
			businessResponse,
			configurationResponse,
			navigationResponse,
			dashboardResponse,
		] = await Promise.all([
			user,
			workspaceApi.getBusiness(businessId),
			workspaceApi.getConfiguration(businessId),
			workspaceApi.getNavigation(businessId),
			workspaceApi.getDashboard(businessId),
		]);

		return {
			user: userResponse,

			business: businessResponse.data.data,

			configuration: configurationResponse.data.data,

			navigation: navigationResponse.data.data,

			dashboard: dashboardResponse.data.data,

			permissions: configurationResponse.data.data.capabilities ?? [],
		};
	}
}

export default new ProvisioningService();
