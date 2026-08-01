import { request } from "../api/index.js";

export const getNavigation = async (businessId) => {
	const { data } = await request.get(`/businesses/${businessId}/navigation`);

	return data.data;
};
