import {
	AUDIT_ACTIONS,
	AUDIT_ENTITY_TYPES,
	ensureOfferingSupportsComponent,
	OFFERING_COMPONENTS,
	ensureBusinessExists,
	ensureOfferingExists,
} from "../../../../../shared/index.js";

import { auditLogService } from "../../../../audit/index.js";

import { membershipFactory } from "../builders/index.js";
import { membershipPresenter } from "../presenters/index.js";
import { membershipRepository } from "../repositories/index.js";

class MembershipService {
	ensureMembershipSupported(offering) {
		ensureOfferingSupportsComponent(
			offering,
			OFFERING_COMPONENTS.MEMBERSHIP,
			"Membership is not supported for this offering.",
		);
	}

	buildAuditMetadata(membership) {
		return {
			offeringId: membership.offering,
			membershipId: membership.id,
			active: membership.active,
			approvalRequired: membership.approvalRequired,
			durationMinutes: membership.durationMinutes,
			renewable: membership.renewable,
		};
	}

	async setMembership({
		businessId,
		offeringId,
		data,
		actor,
		requestMetadata,
	}) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureMembershipSupported(offering);

		let membership = await membershipRepository.findByBusinessAndOffering(
			businessId,
			offeringId,
		);

		if (!membership) {
			const assignment = membershipFactory.createMembershipAssignment({
				businessId,
				offeringId,
				data,
				actor,
			});

			membership = await membershipRepository.create(assignment);

			await auditLogService.log({
				business: businessId,
				entityType: AUDIT_ENTITY_TYPES.OFFERING_MEMBERSHIP,
				entityId: membership.id,
				action: AUDIT_ACTIONS.OFFERING_MEMBERSHIP_CREATED,
				actor,
				requestMetadata,
				metadata: this.buildAuditMetadata(membership),
			});
		} else {
			if (data.active !== undefined) {
				membership.active = data.active;
			}

			if (data.approvalRequired !== undefined) {
				membership.approvalRequired = data.approvalRequired;
			}

			if (data.durationMinutes !== undefined) {
				membership.durationMinutes = data.durationMinutes;
			}

			if (data.renewable !== undefined) {
				membership.renewable = data.renewable;
			}

			membership.updatedBy = actor.id;

			await membershipRepository.save(membership);

			await auditLogService.log({
				business: businessId,
				entityType: AUDIT_ENTITY_TYPES.OFFERING_MEMBERSHIP,
				entityId: membership.id,
				action: AUDIT_ACTIONS.OFFERING_MEMBERSHIP_UPDATED,
				actor,
				requestMetadata,
				metadata: this.buildAuditMetadata(membership),
			});
		}

		return membershipPresenter.present(membership);
	}

	async getMembership(businessId, offeringId) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureMembershipSupported(offering);

		const membership = await membershipRepository.findByBusinessAndOffering(
			businessId,
			offeringId,
		);

		return membershipPresenter.present(membership);
	}
}

export const membershipService = new MembershipService();

export default membershipService;
