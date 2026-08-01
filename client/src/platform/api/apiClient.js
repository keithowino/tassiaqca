import axios from "axios";

import environment from "../../app/config/environment";

import registerAuthInterceptor from "./interceptors/auth.interceptor";
import registerResponseInterceptor from "./interceptors/response.interceptor";

const apiClient = axios.create({
	baseURL: environment.apiBaseUrl,

	headers: {
		"Content-Type": "application/json",
	},
});

registerAuthInterceptor(apiClient);
registerResponseInterceptor(apiClient);

export default apiClient;
