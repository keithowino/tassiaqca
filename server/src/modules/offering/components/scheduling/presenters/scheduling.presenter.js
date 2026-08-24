import { getId } from "../../../../../shared/index.js";

class SchedulingPresenter {
	present(scheduling) {
		if (!scheduling) {
			return null;
		}

		return {
			id: scheduling.id,

			businessId: getId(scheduling.business),

			offeringId: getId(scheduling.offering),

			mode: scheduling.mode,
			timezone: scheduling.timezone,
			active: scheduling.active,

			createdBy: getId(scheduling.createdBy),

			updatedBy: getId(scheduling.updatedBy),

			createdAt: scheduling.createdAt,
			updatedAt: scheduling.updatedAt,
		};
	}
}

export const schedulingPresenter = new SchedulingPresenter();

export default schedulingPresenter;
