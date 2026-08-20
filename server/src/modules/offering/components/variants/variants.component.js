import componentContract from "../component.contract.js";

// files from the validators folder have been called/ imported here twice instead of using a single barrel import, i'll have to confirm why the LLM structured it as so.
import variantsSchema from "./validators/variants.schema.js";
import { normalizeVariants } from "./validators/index.js";

import { variantsService } from "./services/index.js";

export const variantsComponent = {
	...componentContract,

	validateCreate(context) {
		if (context.data.variants === undefined) {
			return;
		}

		variantsSchema.parse(context.data.variants);
	},

	validateUpdate(context) {
		if (context.data.variants === undefined) {
			return;
		}

		variantsSchema.parse(context.data.variants);
	},

	beforeCreate(context) {
		if (context.data.variants === undefined) {
			return;
		}

		context.data.variants = normalizeVariants(context.data.variants);
	},

	beforeUpdate(context) {
		if (context.data.variants === undefined) {
			return;
		}

		context.data.variants = normalizeVariants(context.data.variants);
	},

	async afterCreate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (data.variants === undefined) {
			return;
		}

		const variants = await variantsService.setVariants({
			businessId,
			offeringId: offering.id,
			variants: data.variants,
			actor,
		});

		state.variants = variants;
	},

	async afterUpdate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (data.variants === undefined) {
			return;
		}

		const variants = await variantsService.setVariants({
			businessId,
			offeringId: offering.id,
			variants: data.variants,
			actor,
		});

		state.variants = variants;
	},
};

export default variantsComponent;
