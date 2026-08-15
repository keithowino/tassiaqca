import { OfferingAttribute } from "../models/index.js";

class AttributesRepository {
	async create(data, session = null) {
		const [attribute] = await OfferingAttribute.create([data], {
			session,
		});

		return attribute;
	}

	async createMany(data, session = null) {
		if (!data.length) {
			return [];
		}

		return OfferingAttribute.insertMany(data, {
			session,
		});
	}

	async findByOffering(offeringId) {
		return OfferingAttribute.find({
			offering: offeringId,
		}).sort({
			createdAt: 1,
		});
	}

	async findByOfferingAndName(offeringId, name) {
		return OfferingAttribute.findOne({
			offering: offeringId,
			name,
		}).collation({
			locale: "en",
			strength: 2,
		});
	}

	async deleteByOffering(offeringId, session = null) {
		return OfferingAttribute.deleteMany(
			{
				offering: offeringId,
			},
			{
				session,
			},
		);
	}
}

export default new AttributesRepository();
