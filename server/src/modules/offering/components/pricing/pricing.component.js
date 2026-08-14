import componentContract from "../component.contract.js";

import { pricingService } from "./services/index.js";

import { setCurrentPricingSchema } from "./validators/index.js";

/**
 * Pricing Component
 *
 * Integrates the Pricing domain into the Offering lifecycle.
 *
 * The component never performs pricing logic itself.
 * It delegates all pricing operations to the Pricing Service.
 */
export const pricingComponent = {
	...componentContract,

	validateCreate(context) {
		if (!context.data.pricing) {
			return;
		}

		setCurrentPricingSchema.parse(context.data.pricing);
	},

	validateUpdate(context) {
		if (!context.data.pricing) {
			return;
		}

		setCurrentPricingSchema.parse(context.data.pricing);
	},

	/**
	 * Create the initial price immediately after
	 * the Offering has been created.
	 */
	async afterCreate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (!data?.pricing) {
			return;
		}

		const pricing = await pricingService.setCurrentPrice({
			businessId,
			offeringId: offering.id,
			data: data.pricing,
			actor,
		});

		state.pricing = pricing;
	},

	/**
	 * Updating pricing creates a new immutable version.
	 */
	async afterUpdate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (!data?.pricing) {
			return;
		}

		const pricing = await pricingService.setCurrentPrice({
			businessId,
			offeringId: offering.id,
			data: data.pricing,
			actor,
		});

		state.pricing = pricing;
	},
};

export default pricingComponent;
