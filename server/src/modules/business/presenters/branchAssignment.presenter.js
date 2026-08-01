class BranchAssignmentPresenter {
	present(assignment) {
		return {
			id: assignment.id,

			businessMember:
				assignment.businessMember?._id ?? assignment.businessMember,

			branch: assignment.branch?._id ?? assignment.branch,

			assignedBy: assignment.assignedBy?._id ?? assignment.assignedBy,

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
