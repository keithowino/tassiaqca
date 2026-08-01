import { getId, isPopulated } from "../../../shared/utils/presenter.js";
import inventoryPresenter from "./inventory.presenter.js";
import productPresenter from "./product.presenter.js";

class StockMovementPresenter {
	present(movement) {
		const businessId = getId(movement.business);
		const inventoryId = getId(movement.inventory);
		const productId = getId(movement.product);

		const inventory = isPopulated(movement.inventory, "product")
			? inventoryPresenter.present(movement.inventory)
			: undefined;

		const product = isPopulated(movement.product, "name")
			? productPresenter.present(movement.product)
			: undefined;

		return {
			id: movement.id,

			businessId,

			inventoryId,
			inventory,

			productId,
			product,

			type: movement.type,

			quantity: movement.quantity,

			quantityBefore: movement.quantityBefore,

			quantityAfter: movement.quantityAfter,

			reason: movement.reason,

			notes: movement.notes,

			status: movement.status,

			/**
			 * short term fix
			 */
			createdBy: isPopulated(movement.createdBy, "email")
				? {
						id: getId(movement.createdBy),
						firstName: movement.createdBy.firstName,
						lastName: movement.createdBy.lastName,
						email: movement.createdBy.email,
					}
				: getId(movement.createdBy),

			createdAt: movement.createdAt,
		};
	}

	presentCollection({ data, pagination }) {
		return {
			data: data.map((movement) => this.present(movement)),
			pagination,
		};
	}
}

export default new StockMovementPresenter();
