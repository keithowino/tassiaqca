import componentContract from "../component.contract.js";

// The validators index.js has been called/ imported here twice, i'll have to confirm why the LLM structured it as so.
import {
	inventoryCreateSchema,
	inventoryUpdateSchema,
} from "./validators/index.js";
import { normalizeInventory } from "./validators/index.js";

import { inventoryService } from "./services/index.js";

export const inventoryComponent = {
	...componentContract,

	validateCreate(context) {
		if (context.data.inventory === undefined) {
			return;
		}

		inventoryCreateSchema.parse(context.data.inventory);
	},

	validateUpdate(context) {
		if (context.data.inventory === undefined) {
			return;
		}

		inventoryUpdateSchema.parse(context.data.inventory);
	},

	beforeCreate(context) {
		if (context.data.inventory === undefined) {
			return;
		}

		context.data.inventory = normalizeInventory(context.data.inventory);
	},

	beforeUpdate(context) {
		if (context.data.inventory === undefined) {
			return;
		}

		context.data.inventory = normalizeInventory(context.data.inventory);
	},

	async afterCreate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (data.inventory === undefined) {
			return;
		}

		const inventory = await inventoryService.create({
			businessId,
			offeringId: offering.id,
			data: data.inventory,
			actor,
		});

		state.inventory = inventory;
	},

	async afterUpdate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (data.inventory === undefined) {
			return;
		}

		const inventoryData = {
			...data.inventory,
		};

		const variantId = inventoryData.variantId ?? null;

		delete inventoryData.variantId;

		const inventory = await inventoryService.update({
			businessId,
			offeringId: offering.id,
			variantId,
			data: inventoryData,
			actor,
		});

		state.inventory = inventory;
	},

	async afterArchive(context) {
		const { businessId, offering, state } = context;

		state.inventory = await inventoryService.archive({
			businessId,
			offeringId: offering.id,
		});
	},

	async afterRestore(context) {
		const { businessId, offering, state } = context;

		state.inventory = await inventoryService.restore({
			businessId,
			offeringId: offering.id,
		});
	},
};

export default inventoryComponent;
