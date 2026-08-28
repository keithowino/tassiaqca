import {
	AUDIT_ACTIONS,
	AUDIT_ENTITY_TYPES,
	ensureOfferingSupportsComponent,
	OFFERING_COMPONENTS,
	ensureBusinessExists,
	ensureOfferingExists,
} from "../../../../../shared/index.js";

import { auditLogService } from "../../../../audit/index.js";

import { calendarFactory } from "../builders/index.js";
import { calendarPresenter } from "../presenters/index.js";
import { calendarRepository } from "../repositories/index.js";

class CalendarService {
	ensureCalendarSupported(offering) {
		ensureOfferingSupportsComponent(
			offering,
			OFFERING_COMPONENTS.CALENDAR,
			"Calendar is not supported for this offering.",
		);
	}

	ensureSchedulingSupported(offering) {
		ensureOfferingSupportsComponent(
			offering,
			OFFERING_COMPONENTS.SCHEDULING,
			"Calendar requires Scheduling support.",
		);
	}

	buildAuditMetadata(calendar) {
		return {
			offeringId: calendar.offering,
			calendarId: calendar.id,
			name: calendar.name,
			timezone: calendar.timezone,
			type: calendar.type,
			active: calendar.active,
		};
	}

	async setCalendar({
		businessId,
		offeringId,
		data,
		actor,
		requestMetadata,
	}) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureCalendarSupported(offering);
		this.ensureSchedulingSupported(offering);

		let calendar = await calendarRepository.findByOfferingAndBusiness(
			businessId,
			offeringId,
		);

		if (!calendar) {
			const assignment = calendarFactory.createCalendarAssignment({
				businessId,
				offeringId,
				data,
				actor,
			});

			calendar = await calendarRepository.create(assignment);

			await auditLogService.log({
				business: businessId,
				entityType: AUDIT_ENTITY_TYPES.OFFERING_CALENDAR,
				entityId: calendar.id,
				action: AUDIT_ACTIONS.OFFERING_CALENDAR_CREATED,
				actor,
				requestMetadata,
				metadata: this.buildAuditMetadata(calendar),
			});
		} else {
			calendar.name = data.name;
			calendar.timezone = data.timezone;
			calendar.type = data.type;
			calendar.active = data.active ?? true;
			calendar.updatedBy = actor.id;

			await calendarRepository.save(calendar);

			await auditLogService.log({
				business: businessId,
				entityType: AUDIT_ENTITY_TYPES.OFFERING_CALENDAR,
				entityId: calendar.id,
				action: AUDIT_ACTIONS.OFFERING_CALENDAR_UPDATED,
				actor,
				requestMetadata,
				metadata: this.buildAuditMetadata(calendar),
			});
		}

		return calendarPresenter.present(calendar);
	}

	async getCalendar(businessId, offeringId) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureCalendarSupported(offering);
		this.ensureSchedulingSupported(offering);

		const calendar = await calendarRepository.findByOfferingAndBusiness(
			businessId,
			offeringId,
		);

		return calendarPresenter.present(calendar);
	}
}

export const calendarService = new CalendarService();

export default calendarService;
