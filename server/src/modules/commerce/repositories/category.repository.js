import ProductCategory from "../models/ProductCategory.js";
import { CATEGORY_STATUS } from "../../../shared/constants/index.js";

/*
|--------------------------------------------------------------------------
| Create & Save
|--------------------------------------------------------------------------
*/

async function create(data) {
	return ProductCategory.create(data);
}

async function save(category) {
	return category.save();
}

/*
|--------------------------------------------------------------------------
| Find One
|--------------------------------------------------------------------------
*/

async function findById(categoryId) {
	return ProductCategory.findById(categoryId);
}

async function findByBusinessAndId(businessId, categoryId) {
	return ProductCategory.findOne({
		_id: categoryId,
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

	return ProductCategory.findOne(query);
}

async function findByBusinessAndSlug(businessId, slug, excludeId = null) {
	const query = {
		business: businessId,
		slug,
	};

	if (excludeId) {
		query._id = { $ne: excludeId };
	}

	return ProductCategory.findOne(query);
}

async function existsByBusinessAndSlug(businessId, slug, excludeId = null) {
	const query = {
		business: businessId,
		slug,
	};

	if (excludeId) {
		query._id = { $ne: excludeId };
	}

	return ProductCategory.exists(query);
}

/*
|--------------------------------------------------------------------------
| Lists
|--------------------------------------------------------------------------
*/

async function findByBusiness(
	businessId,
	{ search, status, sort = "-createdAt", skip = 0, limit = 20 },
) {
	const query = {
		business: businessId,
	};

	if (search) {
		query.name = {
			$regex: search,
			$options: "i",
		};
	}

	if (status) {
		query.status = status;
	}

	const [data, total] = await Promise.all([
		ProductCategory.find(query)
			.sort(sort)
			.skip(skip)
			.limit(limit)
			.populate("parentCategory", "name slug"),

		ProductCategory.countDocuments(query),
	]);

	return {
		data,
		total,
	};
}

/*
|--------------------------------------------------------------------------
| Archive
|--------------------------------------------------------------------------
*/

async function archive(category) {
	category.status = CATEGORY_STATUS.ARCHIVED;

	return save(category);
}

async function restore(category) {
	category.status = CATEGORY_STATUS.ACTIVE;

	return save(category);
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

	archive,
	restore,
};
