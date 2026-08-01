import { getId, isPopulated } from "../../../shared/utils/presenter.js";
import productPresenter from "./product.presenter.js";

class InventoryPresenter {
	present(inventory) {
		const businessId = getId(inventory.business);
		const productId = getId(inventory.product);

		const product = isPopulated(inventory.product, "name")
			? productPresenter.present(inventory.product)
			: undefined;

		const availableQuantity =
			inventory.quantity - inventory.reservedQuantity;

		return {
			id: inventory.id,

			businessId,

			productId,

			product,

			quantity: inventory.quantity,

			reservedQuantity: inventory.reservedQuantity,

			availableQuantity: inventory.quantity - inventory.reservedQuantity,

			lowStockThreshold: inventory.lowStockThreshold,

			isLowStock: availableQuantity <= inventory.lowStockThreshold,

			status: inventory.status,

			createdBy: inventory.createdBy,

			updatedBy: inventory.updatedBy,

			createdAt: inventory.createdAt,

			updatedAt: inventory.updatedAt,
		};
	}

	presentCollection({ data, pagination }) {
		return {
			data: data.map((inventory) => this.present(inventory)),
			pagination,
		};
	}
}

export default new InventoryPresenter();
