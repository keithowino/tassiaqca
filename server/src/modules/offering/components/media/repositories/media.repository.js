import { OfferingMedia } from "../models/index.js";

class MediaRepository {
	async create(data, session = null) {
		const [media] = await OfferingMedia.create([data], {
			session,
		});

		return media;
	}

	async createMany(data, session = null) {
		if (!data.length) {
			return [];
		}

		return OfferingMedia.insertMany(data, {
			session,
		});
	}

	async findByOffering(offeringId) {
		return OfferingMedia.find({
			offering: offeringId,
		}).sort({
			position: 1,
			createdAt: 1,
		});
	}

	async findByOfferingAndAsset(offeringId, assetId) {
		return OfferingMedia.findOne({
			offering: offeringId,
			assetId,
		});
	}

	async deleteByOffering(offeringId, session = null) {
		return OfferingMedia.deleteMany(
			{
				offering: offeringId,
			},
			{
				session,
			},
		);
	}
}

export default new MediaRepository();
