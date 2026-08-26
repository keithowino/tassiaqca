import componentContract from "../component.contract.js";

import { setSubscriptionSchema } from "./validators/index.js";

/**
 * The component itself does not contain subscription business logic. It integrates Subscription with the generic Offering lifecycle, exactly as the existing component contract intends. The architecture defines the component pipeline as generic and registry-driven.
 *
 * At this stage there is intentionally no afterCreate() or afterUpdate(). Subscription configuration is managed through its dedicated API. This keeps the Offering lifecycle from creating a second, implicit subscription-management path.
 */
export const subscriptionComponent = {
	...componentContract,

	validateCreate(context) {
		if (!context.data.subscription) {
			return;
		}

		setSubscriptionSchema.parse(context.data.subscription);
	},

	validateUpdate(context) {
		if (!context.data.subscription) {
			return;
		}

		setSubscriptionSchema.parse(context.data.subscription);
	},
};

export default subscriptionComponent;
