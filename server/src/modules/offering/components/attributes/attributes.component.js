import componentContract from "../component.contract.js";

import attributesSchema from "./validators/attributes.schema.js";
import { normalizeAttributes } from "./validators/index.js";

import { attributesService } from "./services/index.js";

export const attributesComponent = {
	...componentContract,

	validateCreate(context) {
		if (context.data.attributes === undefined) {
			return;
		}

		attributesSchema.parse(context.data.attributes);
	},

	validateUpdate(context) {
		if (context.data.attributes === undefined) {
			return;
		}

		attributesSchema.parse(context.data.attributes);
	},

	beforeCreate(context) {
		if (context.data.attributes === undefined) {
			return;
		}

		context.data.attributes = normalizeAttributes(context.data.attributes);
	},

	beforeUpdate(context) {
		if (context.data.attributes === undefined) {
			return;
		}

		context.data.attributes = normalizeAttributes(context.data.attributes);
	},

	async afterCreate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (data.attributes === undefined) {
			return;
		}

		const attributes = await attributesService.setAttributes({
			businessId,
			offeringId: offering.id,
			attributes: data.attributes,
			actor,
		});

		state.attributes = attributes;
	},

	async afterUpdate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (data.attributes === undefined) {
			return;
		}

		const attributes = await attributesService.setAttributes({
			businessId,
			offeringId: offering.id,
			attributes: data.attributes,
			actor,
		});

		state.attributes = attributes;
	},
};

export default attributesComponent;
