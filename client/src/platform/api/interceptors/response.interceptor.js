import { sessionManager } from "../../session/index.js";

export default function registerResponseInterceptor(apiClient) {
	apiClient.interceptors.response.use(
		(response) => response,

		(error) => {
			if (error.response?.status === 401) {
				sessionManager.clearSession();

				window.location.replace("/login");
			}

			return Promise.reject(error);
		},
	);
}
