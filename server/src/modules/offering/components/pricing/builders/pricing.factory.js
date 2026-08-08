import PricingBuilder from "./pricing.builder.js";

import {
	BILLING_MODELS,
	CURRENCIES,
	OFFERING_PRICE_STATUS,
} from "../../../../../shared/constants/index.js";

function createPricing({ businessId, offeringId, data, actor }) {
	return new PricingBuilder()
		.setBusiness(businessId)
		.setOffering(offeringId)
		.setAmount(data.amount)
		.setCostPrice(data.costPrice)
		.setCurrency(data.currency ?? CURRENCIES.KES)
		.setBillingModel(data.billingModel ?? BILLING_MODELS.ONE_TIME)
		.setEffectiveFrom(data.effectiveFrom ?? new Date())
		.setEffectiveTo(data.effectiveTo ?? null)
		.setCurrent(true)
		.setStatus(OFFERING_PRICE_STATUS.ACTIVE)
		.setChangeReason(data.changeReason)
		.setMetadata(data.metadata ?? {})
		.setCreatedBy(actor.id)
		.build();
}

export default {
	createPricing,
};
