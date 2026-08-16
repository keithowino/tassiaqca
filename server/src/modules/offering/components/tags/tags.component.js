import componentContract from "../component.contract.js";

import tagsSchema from "./validators/tags.schema.js";
import { normalizeTags } from "./validators/index.js";

import { tagsService } from "./services/index.js";

export const tagsComponent = {
	...componentContract,

	validateCreate(context) {
		if (context.data.tags === undefined) {
			return;
		}

		tagsSchema.parse(context.data.tags);
	},

	validateUpdate(context) {
		if (context.data.tags === undefined) {
			return;
		}

		tagsSchema.parse(context.data.tags);
	},

	beforeCreate(context) {
		if (context.data.tags === undefined) {
			return;
		}

		context.data.tags = normalizeTags(context.data.tags);
	},

	beforeUpdate(context) {
		if (context.data.tags === undefined) {
			return;
		}

		context.data.tags = normalizeTags(context.data.tags);
	},

	async afterCreate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (data.tags === undefined) {
			return;
		}

		const tags = await tagsService.setTags({
			businessId,
			offeringId: offering.id,
			tags: data.tags,
			actor,
		});

		state.tags = tags;
	},

	async afterUpdate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (data.tags === undefined) {
			return;
		}

		const tags = await tagsService.setTags({
			businessId,
			offeringId: offering.id,
			tags: data.tags,
			actor,
		});

		state.tags = tags;
	},
};

export default tagsComponent;
