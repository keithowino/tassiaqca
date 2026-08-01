import { tokenStorage } from "../../session/index.js";

export default function registerAuthInterceptor(apiClient) {
	apiClient.interceptors.request.use((config) => {
		const token = tokenStorage.getAccessToken();

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	});
}
