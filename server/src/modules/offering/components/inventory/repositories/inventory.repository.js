import { OfferingInventory } from "../models/index.js";

async function create(data, session = null) {
	const options = session ? { session } : undefined;

	return OfferingInventory.create([data], options).then(
		(documents) => documents[0],
	);
}

async function save(inventory, session = null) {
	if (!inventory) {
		return null;
	}

	return inventory.save(session ? { session } : undefined);
}

async function findById(id, session = null) {
	return OfferingInventory.findById(id).session(session || null);
}

async function findByOffering(
	businessId,
	offeringId,
	variantId = null,
	session = null,
) {
	const query = {
		business: businessId,
		offering: offeringId,
		variant: variantId,
	};

	return OfferingInventory.findOne(query).session(session || null);
}

async function findByOfferingIncludingVariants(
	businessId,
	offeringId,
	session = null,
) {
	return OfferingInventory.find({
		business: businessId,
		offering: offeringId,
	})
		.sort({
			variant: 1,
			createdAt: 1,
		})
		.session(session || null);
}

async function findByBusinessAndId(businessId, inventoryId, session = null) {
	return OfferingInventory.findOne({
		_id: inventoryId,
		business: businessId,
	}).session(session || null);
}

async function update(inventory, data, session = null) {
	Object.assign(inventory, data);

	return save(inventory, session);
}

async function archiveByOffering(businessId, offeringId, session = null) {
	return OfferingInventory.updateMany(
		{
			business: businessId,
			offering: offeringId,
		},
		{
			$set: {
				status: "ARCHIVED",
			},
		},
		{
			session,
		},
	);
}

async function restoreByOffering(businessId, offeringId, session = null) {
	return OfferingInventory.updateMany(
		{
			business: businessId,
			offering: offeringId,
		},
		{
			$set: {
				status: "ACTIVE",
			},
		},
		{
			session,
		},
	);
}

export const inventoryRepository = {
	create,
	save,
	findById,
	findByOffering,
	findByOfferingIncludingVariants,
	findByBusinessAndId,
	update,
	archiveByOffering,
	restoreByOffering,
};

export default inventoryRepository;
