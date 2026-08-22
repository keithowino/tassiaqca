import componentContract from "../component.contract.js";

import {
	durationCreateSchema,
	durationUpdateSchema,
	normalizeDuration,
} from "./validators/index.js";

import { durationService } from "./services/index.js";

export const durationComponent = {
	...componentContract,

	validateCreate(context) {
		if (context.data.duration === undefined) {
			return;
		}

		durationCreateSchema.parse(context.data.duration);
	},

	validateUpdate(context) {
		if (context.data.duration === undefined) {
			return;
		}

		durationUpdateSchema.parse(context.data.duration);
	},

	beforeCreate(context) {
		if (context.data.duration === undefined) {
			return;
		}

		context.data.duration = normalizeDuration(context.data.duration);
	},

	beforeUpdate(context) {
		if (context.data.duration === undefined) {
			return;
		}

		context.data.duration = normalizeDuration(context.data.duration);
	},

	async afterCreate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (data.duration === undefined) {
			return;
		}

		const duration = await durationService.create({
			businessId,
			offeringId: offering.id,
			data: data.duration,
			actor,
		});

		state.duration = duration;
	},

	async afterUpdate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (data.duration === undefined) {
			return;
		}

		const duration = await durationService.update({
			businessId,
			offeringId: offering.id,
			data: data.duration,
			actor,
		});

		state.duration = duration;
	},

	async afterArchive(context) {
		const { businessId, offering, actor, state } = context;

		try {
			const duration = await durationService.archive({
				businessId,
				offeringId: offering.id,
				actor,
			});

			state.duration = duration;
		} catch (error) {
			/*
			 * An offering may legitimately have no Duration
			 * component configured.
			 */
			if (error.code !== "NOT_FOUND") {
				throw error;
			}
		}
	},

	async afterRestore(context) {
		const { businessId, offering, actor, state } = context;

		try {
			const duration = await durationService.restore({
				businessId,
				offeringId: offering.id,
				actor,
			});

			state.duration = duration;
		} catch (error) {
			if (error.code !== "NOT_FOUND") {
				throw error;
			}
		}
	},
};

export default durationComponent;
