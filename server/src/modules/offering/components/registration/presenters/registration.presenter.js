import { getId } from "../../../../../shared/index.js";

class RegistrationPresenter {
	present(registration) {
		if (!registration) {
			return null;
		}

		return {
			id: registration.id,
			businessId: getId(registration.business),
			offeringId: getId(registration.offering),
			active: registration.active,
			approvalRequired: registration.approvalRequired,
			maximumRegistrations: registration.maximumRegistrations,
			registrationDeadlineMinutes:
				registration.registrationDeadlineMinutes,
			createdBy: getId(registration.createdBy),
			updatedBy: getId(registration.updatedBy),
			createdAt: registration.createdAt,
			updatedAt: registration.updatedAt,
		};
	}
}

export const registrationPresenter = new RegistrationPresenter();

export default registrationPresenter;
