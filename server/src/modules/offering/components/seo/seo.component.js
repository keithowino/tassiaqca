import componentContract from "../component.contract.js";

import { seoService } from "./services/index.js";

import { createSeoSchema, updateSeoSchema } from "./validators/index.js";

export const seoComponent = {
	...componentContract,

	validateCreate(context) {
		if (context.data.seo === undefined) {
			return;
		}

		createSeoSchema.parse(context.data.seo);
	},

	validateUpdate(context) {
		if (context.data.seo === undefined) {
			return;
		}

		updateSeoSchema.parse(context.data.seo);
	},

	async afterCreate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (data.seo === undefined) {
			return;
		}

		const seo = await seoService.setSeo({
			businessId,
			offeringId: offering.id,
			data: data.seo,
			actor,
		});

		state.seo = seo;
	},

	async afterUpdate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (data.seo === undefined) {
			return;
		}

		const seo = await seoService.setSeo({
			businessId,
			offeringId: offering.id,
			data: data.seo,
			actor,
		});

		state.seo = seo;
	},
};

export default seoComponent;
