import componentContract from "../component.contract.js";

import seoSchema from "./validators/seo.schema.js";

function normalizeSeo(seo = {}) {
	return {
		...seo,

		title: seo.title?.trim() ?? "",

		description: seo.description?.trim() ?? "",

		keywords: seo.keywords
			? [
					...new Set(
						seo.keywords.map((keyword) =>
							keyword.trim().toLowerCase(),
						),
					),
				]
			: [],

		canonicalUrl: seo.canonicalUrl?.trim() ?? "",

		ogImage: seo.ogImage?.trim() ?? "",
	};
}

export const seoComponent = {
	...componentContract,

	validateCreate(context) {
		if (context.data.seo === undefined) {
			return;
		}

		seoSchema.parse(context.data.seo);
	},

	validateUpdate(context) {
		if (context.data.seo === undefined) {
			return;
		}

		seoSchema.parse(context.data.seo);
	},

	beforeCreate(context) {
		if (context.data.seo === undefined) {
			return;
		}

		context.data.seo = normalizeSeo(context.data.seo);
	},

	beforeUpdate(context) {
		if (context.data.seo === undefined) {
			return;
		}

		context.data.seo = normalizeSeo(context.data.seo);
	},
};

export default seoComponent;
