import { getId } from "../../../../../shared/index.js";

class MembershipPresenter {
	present(membership) {
		if (!membership) {
			return null;
		}

		return {
			id: membership.id,

			businessId: getId(membership.business),

			offeringId: getId(membership.offering),

			active: membership.active,

			approvalRequired: membership.approvalRequired,

			durationMinutes: membership.durationMinutes,

			renewable: membership.renewable,

			createdBy: getId(membership.createdBy),

			updatedBy: getId(membership.updatedBy),

			createdAt: membership.createdAt,

			updatedAt: membership.updatedAt,
		};
	}
}

export const membershipPresenter = new MembershipPresenter();

export default membershipPresenter;
