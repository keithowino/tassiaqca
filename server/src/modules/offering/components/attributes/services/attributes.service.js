import mongoose from "mongoose";

import { attributesFactory } from "../builders/index.js";
import { attributesPresenter } from "../presenters/index.js";
import { attributesRepository } from "../repositories/index.js";

import { offeringRepository } from "../../../repositories/index.js";
import businessService from "../../../../business/services/business.service.js";

import { HTTP_STATUS } from "../../../../../shared/constants/index.js";
import { AppError, ErrorCodes } from "../../../../../shared/errors/index.js";
import { normalizeAttributes } from "../validators/index.js";

class AttributesService {
	async ensureBusinessExists(businessId) {
		return businessService.ensureExists(businessId);
	}

	async ensureOfferingExists(businessId, offeringId) {
		const offering = await offeringRepository.findByBusinessAndId(
			businessId,
			offeringId,
		);

		if (!offering) {
			throw new AppError(
				"Offering not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		return offering;
	}

	// async setAttributes({ businessId, offeringId, attributes = [], actor }) {
	// 	await this.ensureBusinessExists(businessId);

	// 	await this.ensureOfferingExists(businessId, offeringId);

	// 	const session = await mongoose.startSession();

	// 	try {
	// 		session.startTransaction();

	// 		await attributesRepository.deleteByOffering(offeringId, session);

	// 		const assignments = attributes.map((attribute) =>
	// 			attributesFactory.createAttribute({
	// 				businessId,
	// 				offeringId,
	// 				attribute,
	// 				actor,
	// 			}),
	// 		);

	// 		const created = await attributesRepository.createMany(
	// 			assignments,
	// 			session,
	// 		);

	// 		await session.commitTransaction();

	// 		return attributesPresenter.presentCollection(created);
	// 	} catch (error) {
	// 		await session.abortTransaction();
	// 		throw error;
	// 	} finally {
	// 		await session.endSession();
	// 	}
	// }

	async setAttributes({ businessId, offeringId, attributes = [], actor }) {
		await this.ensureBusinessExists(businessId);

		await this.ensureOfferingExists(businessId, offeringId);

		const normalizedAttributes = normalizeAttributes(attributes);

		const session = await mongoose.startSession();

		try {
			session.startTransaction();

			await attributesRepository.deleteByOffering(offeringId, session);

			const assignments = normalizedAttributes.map((attribute) =>
				attributesFactory.createAttribute({
					businessId,
					offeringId,
					attribute,
					actor,
				}),
			);

			const created = await attributesRepository.createMany(
				assignments,
				session,
			);

			await session.commitTransaction();

			return attributesPresenter.presentCollection(created);
		} catch (error) {
			await session.abortTransaction();
			throw error;
		} finally {
			await session.endSession();
		}
	}

	async getByOffering(businessId, offeringId) {
		await this.ensureBusinessExists(businessId);

		await this.ensureOfferingExists(businessId, offeringId);

		const attributes =
			await attributesRepository.findByOffering(offeringId);

		return attributesPresenter.presentCollection(attributes);
	}
}

export const attributesService = new AttributesService();

export default attributesService;
