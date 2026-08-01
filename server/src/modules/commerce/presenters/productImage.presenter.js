import { getId, isPopulated } from "../../../shared/utils/presenter.js";

import productPresenter from "./product.presenter.js";

class ProductImagePresenter {
	present(image) {
		const businessId = getId(image.business);
		const productId = getId(image.product);

		const product = isPopulated(image.product, "name")
			? productPresenter.present(image.product)
			: undefined;

		return {
			id: image.id,

			businessId,

			productId,
			product,

			url: image.url,

			storageKey: image.storageKey,

			storageProvider: image.storageProvider,

			width: image.width,

			height: image.height,

			format: image.format,

			bytes: image.bytes,

			altText: image.altText,

			isPrimary: image.isPrimary,

			sortOrder: image.sortOrder,

			createdBy: getId(image.createdBy),

			updatedBy: getId(image.updatedBy),

			createdAt: image.createdAt,

			updatedAt: image.updatedAt,
		};
	}

	presentCollection({ data, pagination }) {
		return {
			data: data.map((image) => this.present(image)),
			pagination,
		};
	}
}

export default new ProductImagePresenter();
