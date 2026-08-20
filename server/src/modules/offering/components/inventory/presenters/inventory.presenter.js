import { getId } from "../../../../../shared/index.js";

class InventoryPresenter {
	present(inventory) {
		if (!inventory) {
			return null;
		}

		return {
			id: inventory.id,

			business: getId(inventory.business),

			offering: getId(inventory.offering),

			variant: getId(inventory.variant) ?? null,

			quantity: inventory.quantity,

			reservedQuantity: inventory.reservedQuantity,

			availableQuantity: inventory.quantity - inventory.reservedQuantity,

			lowStockThreshold: inventory.lowStockThreshold,

			lowStock:
				inventory.quantity - inventory.reservedQuantity <=
				inventory.lowStockThreshold,

			allowBackorder: inventory.allowBackorder,

			status: inventory.status,

			createdBy: getId(inventory.createdBy),

			updatedBy: getId(inventory.updatedBy),

			createdAt: inventory.createdAt,

			updatedAt: inventory.updatedAt,
		};
	}

	presentCollection(inventories) {
		return inventories.map((item) => this.present(item));
	}
}

const inventoryPresenter = new InventoryPresenter();

export default inventoryPresenter;
