export function normalizeInventory(data = {}) {
	return {
		...data,

		quantity:
			data.quantity === undefined ? undefined : Number(data.quantity),

		reservedQuantity:
			data.reservedQuantity === undefined
				? undefined
				: Number(data.reservedQuantity),

		lowStockThreshold:
			data.lowStockThreshold === undefined
				? undefined
				: Number(data.lowStockThreshold),

		allowBackorder:
			data.allowBackorder === undefined
				? undefined
				: Boolean(data.allowBackorder),
	};
}

export default normalizeInventory;
