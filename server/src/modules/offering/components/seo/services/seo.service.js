import { seoFactory } from "../builders/index.js";
import { seoPresenter } from "../presenters/index.js";
import { seoRepository } from "../repositories/index.js";

import { normalizeSeo } from "../validators/index.js";

import {
	ensureBusinessExists,
	ensureOfferingExists,
} from "../../shared/index.js";

class SeoService {
	async setSeo({ businessId, offeringId, data, actor }) {
		await ensureBusinessExists(businessId);

		await ensureOfferingExists(businessId, offeringId);

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

			return seoPresenter.present(created);
		}

		existing.title = normalizedSeo.title;
		existing.description = normalizedSeo.description;
		existing.keywords = normalizedSeo.keywords;
		existing.canonicalUrl = normalizedSeo.canonicalUrl;
		existing.ogImage = normalizedSeo.ogImage;
		existing.updatedBy = actor.id;

		const updated = await seoRepository.save(existing);

		return seoPresenter.present(updated);
	}

	async getByOffering(businessId, offeringId) {
		await ensureBusinessExists(businessId);

		await ensureOfferingExists(businessId, offeringId);

		const seo = await seoRepository.findByBusinessAndOffering(
			businessId,
			offeringId,
		);

		return seoPresenter.present(seo);
	}
}

export const seoService = new SeoService();

export default seoService;
