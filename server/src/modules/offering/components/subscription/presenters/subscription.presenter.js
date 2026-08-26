import { getId } from "../../../../../shared/index.js";

class SubscriptionPresenter {
	present(subscription) {
		if (!subscription) {
			return null;
		}

		return {
			id: subscription.id,
			businessId: getId(subscription.business),
			offeringId: getId(subscription.offering),
			active: subscription.active,
			approvalRequired: subscription.approvalRequired,
			billingIntervalUnit: subscription.billingIntervalUnit,
			billingIntervalCount: subscription.billingIntervalCount,
			renewable: subscription.renewable,
			createdBy: getId(subscription.createdBy),
			updatedBy: getId(subscription.updatedBy),
			createdAt: subscription.createdAt,
			updatedAt: subscription.updatedAt,
		};
	}
}

export const subscriptionPresenter = new SubscriptionPresenter();

export default subscriptionPresenter;
