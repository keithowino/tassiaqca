import { request } from "../api/index.js";

export const getDashboard = async (businessId) => {
	const { data } = await request.get(`/businesses/${businessId}/dashboard`);

	return data.data;
};
