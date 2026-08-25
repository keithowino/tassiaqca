import componentContract from "../component.contract.js";

import { enrollmentService } from "./services/index.js";
import { setEnrollmentSchema } from "./validators/index.js";

const enrollmentComponent = {
	...componentContract,

	validateCreate(context) {
		if (context.data.enrollment === undefined) {
			return;
		}

		setEnrollmentSchema.parse(context.data.enrollment);
	},

	validateUpdate(context) {
		if (context.data.enrollment === undefined) {
			return;
		}

		setEnrollmentSchema.parse(context.data.enrollment);
	},

	async afterCreate(context) {
		if (context.data.enrollment === undefined) {
			return;
		}

		const enrollment = await enrollmentService.setEnrollment({
			businessId: context.businessId,
			offeringId: context.offering.id,
			data: context.data.enrollment,
			actor: context.actor,
			requestMetadata: context.requestMetadata,
		});

		context.state.enrollment = enrollment;
	},

	async afterUpdate(context) {
		if (context.data.enrollment === undefined) {
			return;
		}

		const enrollment = await enrollmentService.setEnrollment({
			businessId: context.businessId,
			offeringId: context.offering.id,
			data: context.data.enrollment,
			actor: context.actor,
			requestMetadata: context.requestMetadata,
		});

		context.state.enrollment = enrollment;
	},
};

export default enrollmentComponent;
