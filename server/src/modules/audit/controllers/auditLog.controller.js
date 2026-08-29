import {
	validateRequest,
	success,
	businessParamsSchema,
} from "../../../shared/index.js";

import auditLogService from "../services/auditLog.service.js";
import { auditLogPresenter } from "../presenters/index.js";

class AuditLogController {
	async listBusinessLogs(req, res, next) {
		try {
			const { params } = validateRequest(
				{
					params: businessParamsSchema,
				},
				req,
			);

			const logs = await auditLogService.listByBusiness(
				params.businessId,
			);

			return success(res, auditLogPresenter.presentCollection(logs));
		} catch (error) {
			next(error);
		}
	}
}

export default new AuditLogController();
