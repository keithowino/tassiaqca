import componentContract from "../component.contract.js";

import { subscriptionService } from "./services/index.js";

import { setSubscriptionSchema } from "./validators/index.js";

export const subscriptionComponent = {
	...componentContract,

	validateCreate(context) {
		if (context.data.subscription === undefined) {
			return;
		}

		setSubscriptionSchema.parse(context.data.subscription);
	},

	validateUpdate(context) {
		if (context.data.subscription === undefined) {
			return;
		}

		setSubscriptionSchema.parse(context.data.subscription);
	},

	async afterCreate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (data?.subscription === undefined) {
			return;
		}

		const subscription = await subscriptionService.setSubscription({
			businessId,
			offeringId: offering.id,
			data: data.subscription,
			actor,
		});

		state.subscription = subscription;
	},

	async afterUpdate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (data?.subscription === undefined) {
			return;
		}

		const subscription = await subscriptionService.setSubscription({
			businessId,
			offeringId: offering.id,
			data: data.subscription,
			actor,
		});

		state.subscription = subscription;
	},
};

export default subscriptionComponent;
