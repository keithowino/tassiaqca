import { BusinessConfiguration } from "../models/businessConfiguration.model.js";

/**
 * #### Reserved
 * - archive()
 * - restore()
 */

const create = (payload, options = {}) =>
	BusinessConfiguration.create([payload], options).then(
		([document]) => document,
	);

const findByBusiness = (businessId) =>
	BusinessConfiguration.findOne({
		business: businessId,
	});

const existsForBusiness = (businessId) =>
	BusinessConfiguration.exists({
		business: businessId,
	});

const update = (businessId, updates, options = {}) =>
	BusinessConfiguration.findOneAndUpdate({ business: businessId }, updates, {
		new: true,
		runValidators: true,
		...options,
	});

const replace = (businessId, replacement, options = {}) =>
	BusinessConfiguration.findOneAndReplace(
		{ business: businessId },
		replacement,
		{
			new: true,
			runValidators: true,
			...options,
		},
	);

const remove = (businessId, options = {}) =>
	BusinessConfiguration.findOneAndDelete(
		{
			business: businessId,
		},
		options,
	);

export default {
	create,
	findByBusiness,
	existsForBusiness,
	update,
	replace,
	remove,
};
