import { getId } from "../../../../../shared/index.js";

class EnrollmentPresenter {
	present(enrollment) {
		if (!enrollment) {
			return null;
		}

		return {
			id: enrollment.id,
			businessId: getId(enrollment.business),
			offeringId: getId(enrollment.offering),
			active: enrollment.active,
			approvalRequired: enrollment.approvalRequired,
			maximumEnrollments: enrollment.maximumEnrollments,
			enrollmentDeadlineMinutes: enrollment.enrollmentDeadlineMinutes,
			createdBy: getId(enrollment.createdBy),
			updatedBy: getId(enrollment.updatedBy),
			createdAt: enrollment.createdAt,
			updatedAt: enrollment.updatedAt,
		};
	}
}

export const enrollmentPresenter = new EnrollmentPresenter();

export default enrollmentPresenter;
