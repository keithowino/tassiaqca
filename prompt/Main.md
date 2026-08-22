```js
`~\server\src\shared\platform\offerings\offering.utils.js`;

import { AppError, ErrorCodes, HTTP_STATUS } from "../../index.js";
import { offeringRegistry } from "./offering.registry.js";

export function offeringSupportsComponent(offering, componentId) {
	const registration = offeringRegistry.get(offering.type);

	return Boolean(
		registration &&
		Array.isArray(registration.components) &&
		registration.components.includes(componentId),
	);
}

/**
 * Generic enforcement helper
 */
export function ensureOfferingSupportsComponent(
	offering,
	componentId,
	message = "This component is not supported by this offering.",
) {
	if (!offeringSupportsComponent(offering, componentId)) {
		throw new AppError(
			message,
			HTTP_STATUS.BAD_REQUEST,
			ErrorCodes.BAD_REQUEST,
		);
	}

	return offering;
}
```

This is the current state of Duration components service:

```js
`~\server\src\modules\offering\components\duration\services\duration.service.js`;

import { durationFactory } from "../builders/index.js";

import { durationPresenter } from "../presenters/index.js";

import { durationRepository } from "../repositories/index.js";

import {
	ensureBusinessExists,
	ensureOfferingExists,
} from "../../shared/index.js";

import {
	HTTP_STATUS,
	AppError,
	ErrorCodes,
	AUDIT_ENTITY_TYPES,
	AUDIT_ACTIONS,
} from "../../../../../shared/index.js";

import { auditLogService } from "../../../../audit/index.js";

class DurationService {
	async ensureDurationDoesNotExist({ businessId, offeringId }) {
		const existing = await durationRepository.findByOffering(
			businessId,
			offeringId,
		);

		if (existing) {
			throw new AppError(
				"Duration already exists for this offering.",
				HTTP_STATUS.CONFLICT,
				ErrorCodes.CONFLICT,
			);
		}
	}

	buildAuditMetadata(duration) {
		return {
			offeringId: duration.offering,
			duration: `${duration.duration} ${duration.unit}`,
			createdBy: duration.createdBy,
			updatedBy: duration.updatedBy,
		};
	}

	async create({ businessId, offeringId, data, actor, requestMetadata }) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		await this.ensureDurationDoesNotExist({
			businessId,
			offeringId,
		});

		const duration = durationFactory.createDuration({
			businessId,
			offeringId: offering.id,
			data,
			actor,
		});

		const created = await durationRepository.create(duration);

		await auditLogService.log({
			business: businessId,
			entityType: AUDIT_ENTITY_TYPES.OFFERING_DURATION,
			entityId: created.id,
			action: AUDIT_ACTIONS.OFFERING_DURATION_CREATED,
			actor,
			requestMetadata,
			metadata: this.buildAuditMetadata(created),
		});

		return durationPresenter.present(created);
	}

	async get({ businessId, offeringId }) {
		await ensureBusinessExists(businessId);

		await ensureOfferingExists(businessId, offeringId);

		const duration = await durationRepository.findByOffering(
			businessId,
			offeringId,
		);

		if (!duration) {
			throw new AppError(
				"Offering duration not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		return durationPresenter.present(duration);
	}

	async update({ businessId, offeringId, data, actor, requestMetadata }) {
		await ensureBusinessExists(businessId);

		await ensureOfferingExists(businessId, offeringId);

		const duration = await durationRepository.findByOffering(
			businessId,
			offeringId,
		);

		if (!duration) {
			throw new AppError(
				"Offering duration not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		Object.assign(duration, data);

		duration.updatedBy = actor.id;

		const updated = await durationRepository.save(duration);

		await auditLogService.log({
			business: businessId,
			entityType: AUDIT_ENTITY_TYPES.OFFERING_DURATION,
			entityId: updated.id,
			action: AUDIT_ACTIONS.OFFERING_DURATION_UPDATED,
			actor,
			requestMetadata,
			metadata: this.buildAuditMetadata(updated),
		});

		return durationPresenter.present(updated);
	}

	async archive({ businessId, offeringId, actor, requestMetadata }) {
		await ensureBusinessExists(businessId);

		await ensureOfferingExists(businessId, offeringId);

		const duration = await durationRepository.findByOffering(
			businessId,
			offeringId,
		);

		if (!duration) {
			throw new AppError(
				"Offering duration not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		if (duration.status === "ARCHIVED") {
			throw new AppError(
				"Offering duration is already archived.",
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.BAD_REQUEST,
			);
		}

		duration.status = "ARCHIVED";
		duration.updatedBy = actor.id;

		const updated = await durationRepository.save(duration);

		await auditLogService.log({
			business: businessId,
			entityType: AUDIT_ENTITY_TYPES.OFFERING_DURATION,
			entityId: updated.id,
			action: AUDIT_ACTIONS.OFFERING_DURATION_ARCHIVED,
			actor,
			requestMetadata,
			metadata: this.buildAuditMetadata(updated),
		});

		return durationPresenter.present(updated);
	}

	async restore({ businessId, offeringId, actor, requestMetadata }) {
		await ensureBusinessExists(businessId);

		await ensureOfferingExists(businessId, offeringId);

		const duration =
			await durationRepository.findByOfferingIncludingArchived(
				businessId,
				offeringId,
			);

		if (!duration) {
			throw new AppError(
				"Offering duration not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		if (duration.status === "ACTIVE") {
			throw new AppError(
				"Offering duration is already active.",
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.BAD_REQUEST,
			);
		}

		duration.status = "ACTIVE";
		duration.updatedBy = actor.id;

		const updated = await durationRepository.save(duration);

		await auditLogService.log({
			business: businessId,
			entityType: AUDIT_ENTITY_TYPES.OFFERING_DURATION,
			entityId: updated.id,
			action: AUDIT_ACTIONS.OFFERING_DURATION_RESTORED,
			actor,
			requestMetadata,
			metadata: this.buildAuditMetadata(updated),
		});

		return durationPresenter.present(updated);
	}
}

export const durationService = new DurationService();

export default durationService;
```

This is how duration is to use the registry:

```js
ensureOfferingSupportsComponent(
	offering,
	OFFERING_COMPONENTS.DURATION,
	"Duration is not supported for this offering.",
);
```

give me the version of the service using `ensureOfferingSupportsComponent` where necessary.
