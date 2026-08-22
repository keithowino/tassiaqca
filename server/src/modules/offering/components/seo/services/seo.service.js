import { seoFactory } from "../builders/index.js";
import { seoPresenter } from "../presenters/index.js";
import { seoRepository } from "../repositories/index.js";

import { normalizeSeo } from "../validators/index.js";

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

class SeoService {
	ensureSeoComponentSupported(offering) {
		return ensureOfferingSupportsComponent(
			offering,
			OFFERING_COMPONENTS.SEO,
			"SEO is not supported for this offering.",
		);
	}

	buildAuditMetadata(data) {
		return {};
	}

	async setSeo({ businessId, offeringId, data, actor, requestMetadata }) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureSeoComponentSupported(offering);

		const normalizedSeo = normalizeSeo(data);

		const existing = await seoRepository.findByBusinessAndOffering(
			businessId,
			offeringId,
		);

		if (!existing) {
			const seo = seoFactory.createSeo({
				businessId,
				offeringId,
				data: normalizedSeo,
				actor,
			});

			const created = await seoRepository.create(seo);

			await auditLogService.log({
				business: businessId,
				entityType: AUDIT_ENTITY_TYPES.OFFERING_SEO,
				entityId: created.id,
				action: AUDIT_ACTIONS.OFFERING_SEO_CREATED,
				actor,
				requestMetadata,
				metadata: this.buildAuditMetadata(created),
			});

			return seoPresenter.present(created);
		}

		existing.title = normalizedSeo.title;
		existing.description = normalizedSeo.description;
		existing.keywords = normalizedSeo.keywords;
		existing.canonicalUrl = normalizedSeo.canonicalUrl;
		existing.ogImage = normalizedSeo.ogImage;
		existing.updatedBy = actor.id;

		const updated = await seoRepository.save(existing);

		await auditLogService.log({
			business: businessId,
			entityType: AUDIT_ENTITY_TYPES.OFFERING_SEO,
			entityId: updated.id,
			action: AUDIT_ACTIONS.OFFERING_SEO_UPDATED,
			actor,
			requestMetadata,
			metadata: this.buildAuditMetadata(created),
		});

		return seoPresenter.present(updated);
	}

	async getByOffering(businessId, offeringId) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureSeoComponentSupported(offering);

		const seo = await seoRepository.findByBusinessAndOffering(
			businessId,
			offeringId,
		);

		return seoPresenter.present(seo);
	}
}

export const seoService = new SeoService();

export default seoService;
