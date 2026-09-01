import lifecycleFactory from "../lifecycles/lifecycle.factory.js";
import { offeringRepository } from "../repositories/index.js";
import { offeringRegistry } from "../../../shared/index.js";

/**
 * Delegation layer
 */
class OfferingService {
	/**
	|--------------------------------------------------
	| Private helper functions
	|--------------------------------------------------
	*/

	registrationFor(type) {
		const registration = offeringRegistry.get(type);

		if (!registration) {
			return {
				lifecycle: lifecycleFactory.resolveLifecycle("UNKNOWN"),
			};
		}

		return registration;
	}

	async resolveExistingRegistration({ businessId, offeringId }) {
		const offering = await offeringRepository.findByBusinessAndId(
			businessId,
			offeringId,
		);

		if (!offering) {
			return {
				lifecycle: lifecycleFactory.resolveLifecycle("UNKNOWN"),
			};
		}

		return registrationFor(offering.type);
	}

	/**
	|--------------------------------------------------
	| Public functions
	|--------------------------------------------------
	*/

	/**
	 * The fallback to "PRODUCT" is only a transitional mechanism. For get, update, archive, and restore, the service does not yet know the offering type because it only receives an offeringId. In the next refinement, the resolver should determine the lifecycle by first loading the offering from the repository:
	 */

	async createOffering(payload) {
		const registration = this.registrationFor(payload.data.type);

		return registration.lifecycle.create({
			...payload,
			registration,
		});
	}

	async updateOffering(payload) {
		const registration = await this.resolveExistingRegistration(payload);

		return registration.lifecycle.update({
			...payload,
			registration,
		});
	}

	async listOfferings(payload) {
		/**
		 * For now you can also do.
		 *
		 * Although list() doesn't use it yet.
		 */
		const registration = this.registrationFor(
			payload.query?.type ?? "PRODUCT",
		);

		return registration.lifecycle.list({
			...payload,
			registration,
		});
	}

	async getOffering(payload) {
		const registration = await this.resolveExistingRegistration(payload);

		return registration.lifecycle.get({
			...payload,
			registration,
		});
	}

	async archiveOffering(payload) {
		const registration = await this.resolveExistingRegistration(payload);

		return registration.lifecycle.archive({
			...payload,
			registration,
		});
	}

	async restoreOffering(payload) {
		const registration = await this.resolveExistingRegistration(payload);

		return registration.lifecycle.restore({
			...payload,
			registration,
		});
	}

	async listPublishedForMarketplace(payload = {}) {
		return offeringRepository.findPublishedForMarketplace({
			type: payload.type,
			search: payload.search,
			businessId: payload.businessId,
			skip: payload.skip ?? 0,
			limit: payload.limit ?? 20,
		});
	}

	async listFeaturedForMarketplace(payload = {}) {
		return offeringRepository.findFeaturedForMarketplace({
			skip: payload.skip ?? 0,
			limit: payload.limit ?? 20,
		});
	}

	async listTrendingForMarketplace(payload = {}) {
		return offeringRepository.findTrendingForMarketplace({
			type: payload.type,
			skip: payload.skip ?? 0,
			limit: payload.limit ?? 20,
		});
	}

	async findPublishedForMarketplaceBySlug(slug) {
		return offeringRepository.findPublishedForMarketplaceBySlug(slug);
	}
}

export default new OfferingService();
