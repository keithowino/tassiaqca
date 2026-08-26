import {
	ensureBusinessExists,
	ensureOfferingExists,
} from "../../shared/index.js";

import {
	AUDIT_ACTIONS,
	AUDIT_ENTITY_TYPES,
	ensureOfferingSupportsComponent,
	OFFERING_COMPONENTS,
} from "../../../../../shared/index.js";

import { auditLogService } from "../../../../audit/index.js";

import { subscriptionFactory } from "../builders/index.js";
import { subscriptionPresenter } from "../presenters/index.js";
import { subscriptionRepository } from "../repositories/index.js";

class SubscriptionService {
	ensureSubscriptionSupported(offering) {
		ensureOfferingSupportsComponent(
			offering,
			OFFERING_COMPONENTS.SUBSCRIPTION,
			"Subscription is not supported for this offering.",
		);
	}

	buildAuditMetadata(subscription) {
		return {
			offeringId: subscription.offering,
			subscriptionId: subscription.id,
			active: subscription.active,
			approvalRequired: subscription.approvalRequired,
			billingIntervalUnit: subscription.billingIntervalUnit,
			billingIntervalCount: subscription.billingIntervalCount,
			renewable: subscription.renewable,
		};
	}

	async setSubscription({
		businessId,
		offeringId,
		data,
		actor,
		requestMetadata,
	}) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureSubscriptionSupported(offering);

		let subscription =
			await subscriptionRepository.findByBusinessAndOffering(
				businessId,
				offeringId,
			);

		if (!subscription) {
			const assignment = subscriptionFactory.createSubscriptionAssignment(
				{
					businessId,
					offeringId,
					data,
					actor,
				},
			);

			subscription = await subscriptionRepository.create(assignment);

			await auditLogService.log({
				business: businessId,
				entityType: AUDIT_ENTITY_TYPES.OFFERING_SUBSCRIPTION,
				entityId: subscription.id,
				action: AUDIT_ACTIONS.OFFERING_SUBSCRIPTION_CREATED,
				actor,
				requestMetadata,
				metadata: this.buildAuditMetadata(subscription),
			});
		} else {
			if (data.active !== undefined) {
				subscription.active = data.active;
			}

			if (data.approvalRequired !== undefined) {
				subscription.approvalRequired = data.approvalRequired;
			}

			if (data.billingIntervalUnit !== undefined) {
				subscription.billingIntervalUnit = data.billingIntervalUnit;
			}

			if (data.billingIntervalCount !== undefined) {
				subscription.billingIntervalCount = data.billingIntervalCount;
			}

			if (data.renewable !== undefined) {
				subscription.renewable = data.renewable;
			}

			subscription.updatedBy = actor.id;

			await subscriptionRepository.save(subscription);

			await auditLogService.log({
				business: businessId,
				entityType: AUDIT_ENTITY_TYPES.OFFERING_SUBSCRIPTION,
				entityId: subscription.id,
				action: AUDIT_ACTIONS.OFFERING_SUBSCRIPTION_UPDATED,
				actor,
				requestMetadata,
				metadata: this.buildAuditMetadata(subscription),
			});
		}

		return subscriptionPresenter.present(subscription);
	}

	async getSubscription(businessId, offeringId) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureSubscriptionSupported(offering);

		const subscription =
			await subscriptionRepository.findByBusinessAndOffering(
				businessId,
				offeringId,
			);

		return subscriptionPresenter.present(subscription);
	}
}

export const subscriptionService = new SubscriptionService();

export default subscriptionService;
