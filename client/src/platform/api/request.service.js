import apiClient from "./apiClient";

class RequestService {
	get(url, config = {}) {
		return apiClient.get(url, config);
	}

	post(url, body = {}, config = {}) {
		return apiClient.post(url, body, config);
	}

	put(url, body = {}, config = {}) {
		return apiClient.put(url, body, config);
	}

	patch(url, body = {}, config = {}) {
		return apiClient.patch(url, body, config);
	}

	delete(url, config = {}) {
		return apiClient.delete(url, config);
	}
}

export default new RequestService();
