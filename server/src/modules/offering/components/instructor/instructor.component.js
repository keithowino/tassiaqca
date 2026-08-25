import componentContract from "../component.contract.js";

import { instructorService } from "./services/index.js";

import { setInstructorSchema } from "./validators/index.js";

export const instructorComponent = {
	...componentContract,

	validateCreate(context) {
		if (context.data.instructors === undefined) {
			return;
		}

		setInstructorSchema.parse({
			instructors: context.data.instructors,
		});
	},

	validateUpdate(context) {
		if (context.data.instructors === undefined) {
			return;
		}

		setInstructorSchema.parse({
			instructors: context.data.instructors,
		});
	},

	async afterCreate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (data?.instructors === undefined) {
			return;
		}

		const instructors = await instructorService.setInstructors({
			businessId,
			offeringId: offering.id,
			// instructors: data.instructors,
			data,
			actor,
		});

		state.instructors = instructors;
	},

	async afterUpdate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (data?.instructors === undefined) {
			return;
		}

		const instructors = await instructorService.setInstructors({
			businessId,
			offeringId: offering.id,
			// instructors: data.instructors,
			data,
			actor,
		});

		state.instructors = instructors;
	},
};

export default instructorComponent;
