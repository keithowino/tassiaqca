import { OfferingVariant } from "../models/index.js";

class VariantsRepository {
	async create(data, session = null) {
		const [variant] = await OfferingVariant.create([data], {
			session,
		});

		return variant;
	}

	async createMany(data, session = null) {
		if (!data.length) {
			return [];
		}

		return OfferingVariant.insertMany(data, {
			session,
		});
	}

	async findById(id) {
		return OfferingVariant.findById(id);
	}

	async findByOffering(offeringId, { includeArchived = true } = {}) {
		const query = {
			offering: offeringId,
		};

		if (!includeArchived) {
			query.status = "ACTIVE";
		}

		return OfferingVariant.find(query).sort({
			createdAt: 1,
		});
	}

	async findByOfferingAndId(offeringId, variantId) {
		return OfferingVariant.findOne({
			offering: offeringId,
			_id: variantId,
		});
	}

	async findByBusinessAndSku(businessId, sku) {
		return OfferingVariant.findOne({
			business: businessId,
			sku,
		});
	}

	async findByOfferingAndSignature(
		offeringId,
		attributeSignature,
		excludeId = null,
	) {
		const query = {
			offering: offeringId,
			attributeSignature,
		};

		if (excludeId) {
			query._id = {
				$ne: excludeId,
			};
		}

		return OfferingVariant.findOne(query).select("+attributeSignature");
	}

	async save(variant, session = null) {
		return variant.save({
			session,
		});
	}

	async archiveByOffering(offeringId, actorId, session = null) {
		return OfferingVariant.updateMany(
			{
				offering: offeringId,
				status: "ACTIVE",
			},
			{
				$set: {
					status: "ARCHIVED",
					updatedBy: actorId,
				},
			},
			{
				session,
			},
		);
	}

	async restoreByOffering(offeringId, actorId, session = null) {
		return OfferingVariant.updateMany(
			{
				offering: offeringId,
				status: "ARCHIVED",
			},
			{
				$set: {
					status: "ACTIVE",
					updatedBy: actorId,
				},
			},
			{
				session,
			},
		);
	}

	async deleteByOffering(offeringId, session = null) {
		return OfferingVariant.deleteMany(
			{
				offering: offeringId,
			},
			{
				session,
			},
		);
	}
}

export default new VariantsRepository();
