import auditLogRepository from "../repositories/auditLog.repository.js";

class AuditLogService {
	async log(
		{
			business,
			entityType,
			entityId,
			action,
			actor,
			requestMetadata = {},
			metadata = {},
		},
		options = {},
	) {
		const {
			ipAddress = null,
			userAgent = null,
			deviceName = null,
			browser = null,
			operatingSystem = null,
		} = requestMetadata;

		return auditLogRepository.create(
			{
				business,
				entityType,
				entityId,
				action,
				actor,
				metadata,
				ipAddress,
				userAgent,
				deviceName,
				browser,
				operatingSystem,
			},
			options,
		);
	}

	async listByBusiness(businessId) {
		return auditLogRepository.findByBusiness(businessId);
	}
}

export default new AuditLogService();
