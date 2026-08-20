import { OfferingDuration } from "../models/index.js";

async function create(data, session = null) {
	const options = session ? { session } : undefined;

	return OfferingDuration.create([data], options).then(
		(documents) => documents[0],
	);
}

async function save(duration, session = null) {
	return duration.save(session ? { session } : undefined);
}

async function findById(id, session = null) {
	return OfferingDuration.findById(id).session(session || null);
}

async function findByOffering(businessId, offeringId, session = null) {
	return OfferingDuration.findOne({
		business: businessId,
		offering: offeringId,
	}).session(session || null);
}

async function findByOfferingIncludingArchived(
	businessId,
	offeringId,
	session = null,
) {
	return OfferingDuration.findOne({
		business: businessId,
		offering: offeringId,
	}).session(session || null);
}

async function archiveByOffering(businessId, offeringId, session = null) {
	return OfferingDuration.updateOne(
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
	return OfferingDuration.updateOne(
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

export const durationRepository = {
	create,
	save,
	findById,
	findByOffering,
	findByOfferingIncludingArchived,
	archiveByOffering,
	restoreByOffering,
};

export default durationRepository;
