import { getId } from "../../../../../shared/utils/presenter.js";

const toNumber = (value) => {
	if (value == null) {
		return null;
	}

	return Number(value.toString());
};

function present(pricing) {
	if (!pricing) {
		return null;
	}

	const businessId = getId(pricing.business);

	return {
		id: pricing.id,

		// // Keep commented for now till i confirm why it chose business: pricing.business,
		// businessId,
		business: pricing.business,

		offering: pricing.offering,

		amount: toNumber(pricing.amount),

		costPrice: toNumber(pricing.costPrice),

		currency: pricing.currency,

		billingModel: pricing.billingModel,

		effectiveFrom: pricing.effectiveFrom,

		effectiveTo: pricing.effectiveTo,

		isCurrent: pricing.isCurrent,

		status: pricing.status,

		changeReason: pricing.changeReason,

		metadata: pricing.metadata,

		createdBy: pricing.createdBy,

		updatedBy: pricing.updatedBy,

		createdAt: pricing.createdAt,

		updatedAt: pricing.updatedAt,
	};
}

function presentCollection(pricings = []) {
	return pricings.map(present);
}

export default {
	present,

	presentCollection,
};
