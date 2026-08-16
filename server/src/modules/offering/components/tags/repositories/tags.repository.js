import { OfferingTag } from "../models/index.js";

class TagsRepository {
	async create(data, session = null) {
		const [tag] = await OfferingTag.create([data], {
			session,
		});

		return tag;
	}

	async createMany(data, session = null) {
		if (!data.length) {
			return [];
		}

		return OfferingTag.insertMany(data, {
			session,
		});
	}

	async findByOffering(offeringId) {
		return OfferingTag.find({
			offering: offeringId,
		}).sort({
			createdAt: 1,
		});
	}

	async findByOfferingAndTag(offeringId, tag) {
		return OfferingTag.findOne({
			offering: offeringId,
			tag,
		});
	}

	async deleteByOffering(offeringId, session = null) {
		return OfferingTag.deleteMany(
			{
				offering: offeringId,
			},
			{
				session,
			},
		);
	}
}

export default new TagsRepository();
