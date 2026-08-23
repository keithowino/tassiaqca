import {
	ensureBusinessExists,
	ensureOfferingExists,
} from "../../shared/index.js";

import {
	AUDIT_ACTIONS,
	AUDIT_ENTITY_TYPES,
	ensureOfferingSupportsComponent,
	OFFERING_COMPONENTS,
} from "../../../../../shared/index.js";

import { auditLogService } from "../../../../audit/index.js";

import { locationFactory } from "../builders/index.js";
import { locationPresenter } from "../presenters/index.js";
import { locationRepository } from "../repositories/index.js";

class LocationService {
	ensureLocationComponentSupported(offering) {
		return ensureOfferingSupportsComponent(
			offering,
			OFFERING_COMPONENTS.LOCATION,
			"Location is not supported for this offering.",
		);
	}

	buildAuditMetadata(location) {
		return {
			offeringId: location.offering,
			locationId: location.id,
			name: location.name,
			city: location.city,
			county: location.county,
			country: location.country,
			latitude: location.latitude,
			longitude: location.longitude,
		};
	}

	async setLocation({
		businessId,
		offeringId,
		data,
		actor,
		requestMetadata,
	}) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureLocationComponentSupported(offering);

		let location = await locationRepository.findByOfferingAndBusiness(
			businessId,
			offeringId,
		);

		const assignment = locationFactory.createLocationAssignment({
			businessId,
			offeringId,
			data,
			actor,
		});

		if (!location) {
			location = await locationRepository.create(assignment);

			await auditLogService.log({
				business: businessId,
				entityType: AUDIT_ENTITY_TYPES.OFFERING_LOCATION,
				entityId: location.id,
				action: AUDIT_ACTIONS.OFFERING_LOCATION_CREATED,
				actor,
				requestMetadata,
				metadata: this.buildAuditMetadata(location),
			});
		} else {
			location.name = data.name ?? "";
			location.address = data.address ?? "";
			location.city = data.city ?? "";
			location.county = data.county ?? "";
			location.country = data.country ?? "Kenya";
			location.latitude = data.latitude ?? null;
			location.longitude = data.longitude ?? null;
			location.updatedBy = actor.id;

			await locationRepository.save(location);

			await auditLogService.log({
				business: businessId,
				entityType: AUDIT_ENTITY_TYPES.OFFERING_LOCATION,
				entityId: location.id,
				action: AUDIT_ACTIONS.OFFERING_LOCATION_UPDATED,
				actor,
				requestMetadata,
				metadata: this.buildAuditMetadata(location),
			});
		}

		return locationPresenter.present(location);
	}

	async getLocation(businessId, offeringId) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureLocationComponentSupported(offering);

		const location = await locationRepository.findByOfferingAndBusiness(
			businessId,
			offeringId,
		);

		return locationPresenter.present(location);
	}
}

export const locationService = new LocationService();

export default locationService;
