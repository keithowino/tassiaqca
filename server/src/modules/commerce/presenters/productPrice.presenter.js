import { getId, isPopulated } from "../../../shared/utils/presenter.js";

import productPresenter from "./product.presenter.js";

class ProductPricePresenter {
	present(price) {
		const businessId = getId(price.business);
		const productId = getId(price.product);

		const product = isPopulated(price.product, "name")
			? productPresenter.present(price.product)
			: undefined;

		return {
			id: price.id,

			businessId,

			productId,
			product,

			sellingPrice:
				price.sellingPrice?.toString?.() ?? price.sellingPrice,

			costPrice: price.costPrice?.toString?.() ?? price.costPrice,

			currency: price.currency,

			status: price.status,

			changeReason: price.changeReason,

			isCurrent: price.isCurrent,

			effectiveFrom: price.effectiveFrom,

			effectiveTo: price.effectiveTo,

			createdBy: getId(price.createdBy),

			updatedBy: getId(price.updatedBy),

			createdAt: price.createdAt,

			updatedAt: price.updatedAt,
		};
	}

	presentCollection({ data, pagination }) {
		return {
			data: data.map((price) => this.present(price)),
			pagination,
		};
	}
}

export default new ProductPricePresenter();
