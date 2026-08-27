import {
	validateRequest,
	asyncHandler,
	success,
	businessOfferingParamsSchema,
} from "../../../../../shared/index.js";

// import { businessOfferingParamsSchema } from "../../shared/index.js";

import { setDownloadSchema } from "../validators/index.js";

import { downloadService } from "../services/index.js";

export const setDownload = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessOfferingParamsSchema,
			body: setDownloadSchema,
		},
		req,
	);

	const data = await downloadService.setDownload({
		businessId: params.businessId,
		offeringId: params.offeringId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, data, "Offering download updated successfully.");
});

export const getDownload = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessOfferingParamsSchema,
		},
		req,
	);

	const data = await downloadService.getDownload(
		params.businessId,
		params.offeringId,
	);

	return success(res, data, "Offering download retrieved successfully.");
});

export default {
	setDownload,
	getDownload,
};
