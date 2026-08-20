import { getId } from "../../../../../shared/index.js";

class DurationPresenter {
	present(duration) {
		if (!duration) {
			return null;
		}

		return {
			id: duration.id,

			business: getId(duration.business),

			offering: getId(duration.offering),

			duration: duration.duration,

			unit: duration.unit,

			status: duration.status,

			createdBy: getId(duration.createdBy),

			updatedBy: getId(duration.updatedBy),

			createdAt: duration.createdAt,

			updatedAt: duration.updatedAt,
		};
	}
}

const durationPresenter = new DurationPresenter();

export default durationPresenter;
