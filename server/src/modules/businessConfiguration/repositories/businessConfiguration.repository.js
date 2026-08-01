import { BusinessConfiguration } from "../models/businessConfiguration.model.js";

/**
 * #### Reserved
 * - archive()
 * - restore()
 */

export const create = (payload, options = {}) =>
	BusinessConfiguration.create([payload], options).then(
		([document]) => document,
	);

export const findByBusiness = (businessId) =>
	BusinessConfiguration.findOne({
		business: businessId,
	});

export const existsForBusiness = (businessId) =>
	BusinessConfiguration.exists({
		business: businessId,
	});

export const update = (businessId, updates, options = {}) =>
	BusinessConfiguration.findOneAndUpdate({ business: businessId }, updates, {
		new: true,
		runValidators: true,
		...options,
	});

export const replace = (businessId, replacement, options = {}) =>
	BusinessConfiguration.findOneAndReplace(
		{ business: businessId },
		replacement,
		{
			new: true,
			runValidators: true,
			...options,
		},
	);

export const remove = (businessId, options = {}) =>
	BusinessConfiguration.findOneAndDelete(
		{
			business: businessId,
		},
		options,
	);
