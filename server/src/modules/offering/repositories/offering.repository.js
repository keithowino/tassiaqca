import { OFFERING_STATUS, OFFERING_VISIBILITY } from "../constants/index.js";
import { Offering } from "../models/index.js";

/**
 * To keep the Offering domain consistent with the rest of the architecture, I would also avoid returning raw Mongoose documents from repository methods long-term. As the project grows, you'll likely want repository methods to consistently apply common population profiles (similar to the populateProfiles approach you've introduced elsewhere). That will make the Offering module easier to extend when Offerings begin referencing Categories, Variants, Assets, Pricing, Inventory, and future subdomains
 */

async function create(data) {
	return Offering.create(data);
}

async function save(offering) {
	return offering.save();
}

async function findById(id) {
	return Offering.findById(id);
}

async function findByBusinessAndId(businessId, offeringId) {
	return Offering.findOne({
		_id: offeringId,
		business: businessId,
	});
}

async function findByBusinessAndName(businessId, name, excludeId = null) {
	const query = {
		business: businessId,
		name,
	};

	if (excludeId) {
		query._id = { $ne: excludeId };
	}

	return Offering.findOne(query);
}

async function findByBusinessAndSlug(businessId, slug, excludeId = null) {
	const query = {
		business: businessId,
		slug,
	};

	if (excludeId) {
		query._id = { $ne: excludeId };
	}

	return Offering.findOne(query);
}

async function existsByBusinessAndSlug(businessId, slug, excludeId = null) {
	const existing = await findByBusinessAndSlug(businessId, slug, excludeId);

	return Boolean(existing);
}

async function findByBusiness(
	businessId,
	{ type, status, visibility, search, skip = 0, limit = 20 } = {},
) {
	const filter = {
		business: businessId,
	};

	if (type) {
		filter.type = type;
	}

	if (status) {
		filter.status = status;
	}

	if (visibility) {
		filter.visibility = visibility;
	}

	if (search) {
		filter.$or = [
			{
				name: {
					$regex: search,
					$options: "i",
				},
			},
			{
				description: {
					$regex: search,
					$options: "i",
				},
			},
		];
	}

	const [data, total] = await Promise.all([
		Offering.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),

		Offering.countDocuments(filter),
	]);

	return {
		data,
		total,
	};
}

async function findPublishedForMarketplace({
	type,
	search,
	businessId,
	skip = 0,
	limit = 20,
} = {}) {
	const filter = {
		status: OFFERING_STATUS.ACTIVE,
		visibility: OFFERING_VISIBILITY.PUBLIC,
		searchable: true,
	};

	if (businessId) {
		filter.business = businessId;
	}

	if (type) {
		filter.type = type;
	}

	if (search) {
		filter.$or = [
			{
				name: {
					$regex: search,
					$options: "i",
				},
			},
			{
				shortDescription: {
					$regex: search,
					$options: "i",
				},
			},
			{
				description: {
					$regex: search,
					$options: "i",
				},
			},
		];
	}

	const [data, total] = await Promise.all([
		Offering.find(filter)
			.sort({ publishedAt: -1, createdAt: -1 })
			.skip(skip)
			.limit(limit),

		Offering.countDocuments(filter),
	]);

	return {
		data,
		total,
	};
}

async function findFeaturedForMarketplace({ skip = 0, limit = 20 } = {}) {
	const filter = {
		status: OFFERING_STATUS.ACTIVE,
		visibility: OFFERING_VISIBILITY.PUBLIC,
		searchable: true,
		featured: true,
	};

	const [data, total] = await Promise.all([
		Offering.find(filter)
			.sort({ publishedAt: -1, createdAt: -1 })
			.skip(skip)
			.limit(limit),
		Offering.countDocuments(filter),
	]);

	return {
		data,
		total,
	};
}

async function findTrendingForMarketplace({ type, skip = 0, limit = 20 } = {}) {
	const filter = {
		status: OFFERING_STATUS.ACTIVE,
		visibility: OFFERING_VISIBILITY.PUBLIC,
		searchable: true,
	};

	if (type) {
		filter.type = type;
	}

	const [data, total] = await Promise.all([
		Offering.find(filter)
			.sort({
				featured: -1,
				publishedAt: -1,
				createdAt: -1,
			})
			.skip(skip)
			.limit(limit),

		Offering.countDocuments(filter),
	]);

	return {
		data,
		total,
	};
}

async function findPublishedForMarketplaceBySlug(slug) {
	return Offering.findOne({
		slug,
		status: OFFERING_STATUS.ACTIVE,
		visibility: OFFERING_VISIBILITY.PUBLIC,
		searchable: true,
	});
}

export default {
	create,
	save,

	findById,

	findByBusinessAndId,
	findByBusinessAndName,
	findByBusinessAndSlug,

	existsByBusinessAndSlug,

	findByBusiness,

	findPublishedForMarketplace,
	findFeaturedForMarketplace,
	findTrendingForMarketplace,
	findPublishedForMarketplaceBySlug,
};
