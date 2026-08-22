import mongoose from "mongoose";

import { mediaFactory } from "../builders/index.js";
import { mediaPresenter } from "../presenters/index.js";
import { mediaRepository } from "../repositories/index.js";

import {
	ensureOfferingSupportsComponent,
	OFFERING_COMPONENTS,
	AUDIT_ENTITY_TYPES,
	AUDIT_ACTIONS,
} from "../../../../../shared/index.js";

import {
	ensureBusinessExists,
	ensureOfferingExists,
} from "../../shared/index.js";
import { auditLogService } from "../../../../audit/index.js";

class MediaService {
	ensureMediaComponentSupported(offering) {
		return ensureOfferingSupportsComponent(
			offering,
			OFFERING_COMPONENTS.MEDIA,
			"Media are not supported for this offering.",
		);
	}

	buildAuditMetadata(data) {
		return {};
	}

	/**
	 * Replaces the complete media collection for an Offering.
	 *
	 * Media assets themselves belong to the Files platform service.
	 * This service only persists the Offering -> media asset relationship and Offering-specific presentation metadata.
	 *
	 * Persistence is transactional:
	 *
	 * 1. Ensure business exists.
	 * 2. Ensure Offering exists within this business.
	 * 3. Start transaction.
	 * 4. Remove existing media assignments.
	 * 5. Build new assignments.
	 * 6. Persist assignments.
	 * 7. Commit transaction.
	 * 8. Return resulting media assignments.
	 */
	async setMedia({ businessId, offeringId, media = [], actor }) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureMediaComponentSupported(offering);

		const session = await mongoose.startSession();

		try {
			session.startTransaction();

			await mediaRepository.deleteByOffering(offeringId, session);

			const assignments = media.map((item) =>
				mediaFactory.createMediaAssignment({
					businessId,
					offeringId,
					data: item,
					actor,
				}),
			);

			const created = await mediaRepository.createMany(
				assignments,
				session,
			);

			await auditLogService.log({
				business: businessId,
				entityType: AUDIT_ENTITY_TYPES.OFFERING_MEDIA,
				entityId: created.id,
				action: AUDIT_ACTIONS.OFFERING_MEDIA_CREATED,
				actor,
				requestMetadata,
				metadata: this.buildAuditMetadata(created),
			});

			await session.commitTransaction();

			return mediaPresenter.presentCollection(created);
		} catch (error) {
			await session.abortTransaction();
			throw error;
		} finally {
			await session.endSession();
		}
	}

	async getByOffering(businessId, offeringId) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureMediaComponentSupported(offering);

		const media = await mediaRepository.findByOffering(offeringId);

		return mediaPresenter.presentCollection(media);
	}
}

export const mediaService = new MediaService();

export default mediaService;
