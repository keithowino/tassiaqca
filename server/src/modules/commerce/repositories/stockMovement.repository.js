import { STOCK_MOVEMENT_POPULATE } from "../../../shared/database/index.js";
import StockMovement from "../models/StockMovement.js";

async function create(movementData, session = null) {
	if (!session) {
		return StockMovement.create(movementData);
	}

	const [movement] = await StockMovement.create([movementData], {
		session,
	});

	return movement;
}

async function findById(id) {
	return StockMovement.findById(id).populate(STOCK_MOVEMENT_POPULATE);
}

async function findByBusinessAndId(businessId, movementId) {
	return StockMovement.findOne({
		_id: movementId,
		business: businessId,
	}).populate(STOCK_MOVEMENT_POPULATE);
}

async function listByBusiness(
	businessId,
	{
		page = 1,
		limit = 20,
		type,
		productId,
		inventoryId,
		sort = "-createdAt",
	} = {},
) {
	const filter = {
		business: businessId,
	};

	if (type) {
		filter.type = type;
	}

	if (productId) {
		filter.product = productId;
	}

	if (inventoryId) {
		filter.inventory = inventoryId;
	}

	const skip = (page - 1) * limit;

	const [data, total] = await Promise.all([
		StockMovement.find(filter)
			.populate(STOCK_MOVEMENT_POPULATE)
			.sort(sort)
			.skip(skip)
			.limit(limit),

		StockMovement.countDocuments(filter),
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

async function listByInventory(businessId, inventoryId, options = {}) {
	return listByBusiness(businessId, {
		...options,
		inventoryId,
	});
}

async function listByProduct(businessId, productId, options = {}) {
	return listByBusiness(businessId, {
		...options,
		productId,
	});
}

export default {
	create,
	findById,
	findByBusinessAndId,
	listByBusiness,
	listByInventory,
	listByProduct,
};
