import { getId } from "../../../../../shared/index.js";

class InstructorPresenter {
	present(instructor) {
		if (!instructor) {
			return null;
		}

		return {
			id: instructor.id,
			businessId: getId(instructor.business),
			offeringId: getId(instructor.offering),
			businessMemberId: getId(instructor.businessMember),
			active: instructor.active,
			createdBy: getId(instructor.createdBy),
			updatedBy: getId(instructor.updatedBy),
			createdAt: instructor.createdAt,
			updatedAt: instructor.updatedAt,
		};
	}

	presentCollection(instructors = []) {
		return instructors.map((instructor) => this.present(instructor));
	}
}

export const instructorPresenter = new InstructorPresenter();

export default instructorPresenter;
