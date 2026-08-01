import { INVENTORY_POPULATE } from "../../../shared/database/index.js";
import Inventory from "../models/Inventory.js";

async function create(inventoryData) {
	return Inventory.create(inventoryData);
}

async function findById(id) {
	return Inventory.findById(id);
}

async function findByBusinessAndId(businessId, inventoryId) {
	return Inventory.findOne({
		_id: inventoryId,
		business: businessId,
	}).populate(INVENTORY_POPULATE);
}

async function findByProduct(productId) {
	return Inventory.findOne({
		product: productId,
	});
}

async function findByBusinessAndProduct(businessId, productId) {
	return Inventory.findOne({
		business: businessId,
		product: productId,
	});
}

async function listByBusiness(
	businessId,
	{ search, status, page = 1, limit = 20, sort = "-createdAt" } = {},
) {
	const filter = {
		business: businessId,
	};

	if (status) {
		filter.status = status;
	}

	/**
	 * Later, when we build the Search aggregate, we'll implement proper product-name searching using one of these approaches:
	 * - MongoDB aggregation pipeline with $lookup
	 * - Atlas Search
	 * - Elasticsearch / Meilisearch (future)
	 * That keeps this repository simple and avoids misleading behavior.
	 */
	// if (search) {
	// 	filter.$or = [
	// 		{
	// 			"product.name": {
	// 				$regex: search,
	// 				$options: "i",
	// 			},
	// 		},
	// 	];
	// }

	const skip = (page - 1) * limit;

	const [data, total] = await Promise.all([
		Inventory.find(filter)
			.populate(INVENTORY_POPULATE)
			.sort(sort)
			.skip(skip)
			.limit(limit),

		Inventory.countDocuments(filter),
	]);

	return {
		data,
		pagination: {
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit),
		},
	};
}

async function save(inventory, session = null) {
	return inventory.save({ session });
}

export default {
	create,
	findById,
	findByBusinessAndId,
	findByProduct,
	findByBusinessAndProduct,
	listByBusiness,
	save,
};
