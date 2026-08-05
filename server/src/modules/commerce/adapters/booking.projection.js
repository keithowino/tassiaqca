import { bookingRepository } from "../repositories/index.js";

import { projectionContract } from "../../offering/projections/index.js";

function mapOfferingToProjection(offering, actor) {
	return {
		business: offering.business,

		offering: offering.id,

		createdBy: actor.id,

		updatedBy: actor.id,
	};
}

async function create(context) {
	const { offering, actor, data } = context;

	return bookingRepository.create({
		...mapOfferingToProjection(offering, actor),

		duration: data.duration ?? 0,

		bufferBefore: data.bufferBefore ?? 0,

		bufferAfter: data.bufferAfter ?? 0,

		maxParticipants: data.maxParticipants ?? 1,

		locationType: data.locationType ?? "ONSITE",

		location: data.location ?? "",

		requiresApproval: data.requiresApproval ?? false,
	});
}

async function find(offeringId) {
	return bookingRepository.findByOffering(offeringId);
}

async function update(context) {
	const { booking, actor, data } = context;

	if (!booking) {
		return null;
	}

	if (data.duration !== undefined) {
		booking.duration = data.duration;
	}

	if (data.bufferBefore !== undefined) {
		booking.bufferBefore = data.bufferBefore;
	}

	if (data.bufferAfter !== undefined) {
		booking.bufferAfter = data.bufferAfter;
	}

	if (data.maxParticipants !== undefined) {
		booking.maxParticipants = data.maxParticipants;
	}

	if (data.locationType !== undefined) {
		booking.locationType = data.locationType;
	}

	if (data.location !== undefined) {
		booking.location = data.location;
	}

	if (data.requiresApproval !== undefined) {
		booking.requiresApproval = data.requiresApproval;
	}

	booking.updatedBy = actor.id;

	return bookingRepository.save(booking);
}

async function archive() {
	return null;
}

async function restore() {
	return null;
}

export default {
	...projectionContract,

	find,

	create,

	update,

	archive,

	restore,
};
