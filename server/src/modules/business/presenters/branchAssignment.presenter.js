import { getId } from "../../../shared/index.js";

class BranchAssignmentPresenter {
	present(assignment) {
		return {
			id: assignment.id,

			businessMember: getId(assignment.businessMember),

			branch: getId(assignment.branch),

			assignedBy: getId(assignment.assignedBy),

			primary: assignment.primary,
			active: assignment.active,

			createdAt: assignment.createdAt,
			updatedAt: assignment.updatedAt,
		};
	}

	presentCollection(assignments) {
		return assignments.map((assignment) => this.present(assignment));
	}
}

export default new BranchAssignmentPresenter();
