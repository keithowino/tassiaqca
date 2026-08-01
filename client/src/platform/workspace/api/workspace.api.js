import { request } from "../../api";

const workspaceApi = {
	getBusiness(businessId) {
		return request.get(`/businesses/${businessId}`);
	},

	getConfiguration(businessId) {
		return request.get(`/businesses/${businessId}/configuration`);
	},

	getNavigation(businessId) {
		return request.get(`/businesses/${businessId}/navigation`);
	},

	getDashboard(businessId) {
		return request.get(`/businesses/${businessId}/dashboard`);
	},
};

export default workspaceApi;
