export function buildInventory({
	businessId,
	offeringId,
	variantId = null,
	data,
	actor,
}) {
	return {
		business: businessId,

		offering: offeringId,

		variant: variantId ?? null,

		quantity: data.quantity ?? 0,

		reservedQuantity: data.reservedQuantity ?? 0,

		lowStockThreshold: data.lowStockThreshold ?? 0,

		allowBackorder: data.allowBackorder ?? false,

		status: data.status ?? "ACTIVE",

		createdBy: actor.id,

		updatedBy: actor.id,
	};
}

export default buildInventory;
