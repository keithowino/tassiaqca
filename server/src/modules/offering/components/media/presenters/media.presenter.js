import { getId } from "../../../../../shared/utils/presenter.js";

class MediaPresenter {
	present(media) {
		if (!media) {
			return null;
		}

		return {
			id: media.id,
			business: getId(media.business),
			offering: getId(media.offering),
			assetId: media.assetId,
			type: media.type,
			url: media.url,
			alt: media.alt,
			title: media.title,
			position: media.position,
			featured: media.featured,
			metadata: media.metadata ? Object.fromEntries(media.metadata) : {},
			createdBy: media.createdBy,
			updatedBy: media.updatedBy,
			createdAt: media.createdAt,
			updatedAt: media.updatedAt,
		};
	}

	presentCollection(media) {
		return media.map((item) => this.present(item));
	}
}

export const mediaPresenter = new MediaPresenter();

export default mediaPresenter;
