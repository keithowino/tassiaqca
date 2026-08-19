import { getId } from "../../../../../shared/index.js";

class VariantsPresenter {
	present(variant) {
		if (!variant) {
			return null;
		}

		return {
			id: variant.id,

			business: getId(variant.business),

			offering: getId(variant.offering),

			sku: variant.sku,

			slug: variant.slug,

			attributes: (variant.attributes ?? []).map((attribute) => ({
				name: attribute.name,
				value: attribute.value,
			})),

			attributeCount: variant.attributeCount,

			status: variant.status,

			createdBy: getId(variant.createdBy),

			updatedBy: getId(variant.updatedBy),

			createdAt: variant.createdAt,

			updatedAt: variant.updatedAt,
		};
	}

	presentCollection(variants = []) {
		return variants.map((variant) => this.present(variant));
	}
}

export const variantsPresenter = new VariantsPresenter();

export default variantsPresenter;
