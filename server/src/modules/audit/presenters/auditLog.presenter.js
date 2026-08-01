import auditActorPresenter from "./auditActor.presenter.js";

class AuditLogPresenter {
	present(log) {
		return {
			id: log.id,
			business: log.business,
			entityType: log.entityType,
			entityId: log.entityId,
			action: log.action,

			actor: auditActorPresenter.present(log.actor),

			metadata: log.metadata,

			requestMetadata: {
				ipAddress: log.ipAddress,
				userAgent: log.userAgent,
				deviceName: log.deviceName,
				browser: log.browser,
				operatingSystem: log.operatingSystem,
			},

			createdAt: log.createdAt,
		};
	}

	presentCollection(logs) {
		return logs.map((log) => this.present(log));
	}
}

export default new AuditLogPresenter();
