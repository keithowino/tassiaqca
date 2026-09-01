import mongoose from "mongoose";

import Category from "../models/Category.js";

import {
	OfferingCategory,
	Offering,
	OFFERING_VISIBILITY,
	OFFERING_STATUS,
} from "../../offering/index.js";

import { CATEGORY_STATUS } from "../../../shared/index.js";

async function create(data) {
	return Category.create(data);
}

async function findById(id) {
	return Category.findById(id).populate("parent");
}

async function findByBusinessAndId(businessId, categoryId) {
	return Category.findOne({
		_id: categoryId,
		business: businessId,
	}).populate("parent");
}

async function findByBusinessAndSlug(businessId, slug, excludeId = null) {
	const query = {
		business: businessId,
		slug,
	};

	if (excludeId) {
		query._id = {
			$ne: excludeId,
		};
	}

	return Category.findOne(query);
}

async function findByBusiness(businessId, filters = {}) {
	const query = {
		business: businessId,
	};

	if (filters.status) {
		query.status = filters.status;
	}

	if (filters.parent !== undefined) {
		query.parent = filters.parent;
	}

	return Category.find(query).sort({
		position: 1,
		name: 1,
	});
}

async function save(category) {
	return category.save();
}

async function existsByBusinessAndSlug(businessId, slug, excludeId = null) {
	const query = {
		business: businessId,
		slug,
	};

	if (excludeId) {
		query._id = {
			$ne: excludeId,
		};
	}

	return Boolean(await Category.exists(query));
}

/**
 * Marketplace contract
 */
// TODO: Access this functions implementation, there is much i don't know about it.
async function findForMarketplace({
	search,
	businessId,
	parentId,
	skip = 0,
	limit = 20,
} = {}) {
	const categoryMatch = {
		status: CATEGORY_STATUS.ACTIVE,
	};

	if (businessId) {
		categoryMatch.business = new mongoose.Types.ObjectId(businessId);
	}

	if (parentId !== undefined) {
		categoryMatch.parent =
			parentId === null ? null : new mongoose.Types.ObjectId(parentId);
	}

	if (search) {
		categoryMatch.$or = [
			{
				name: {
					$regex: search,
					$options: "i",
				},
			},
			{
				description: {
					$regex: search,
					$options: "i",
				},
			},
		];
	}

	const pipeline = [
		{
			$match: categoryMatch,
		},

		{
			$lookup: {
				from: OfferingCategory.collection.name,
				localField: "_id",
				foreignField: "category",
				as: "offeringAssignments",
			},
		},

		{
			$unwind: "$offeringAssignments",
		},

		{
			$lookup: {
				from: Offering.collection.name,
				localField: "offeringAssignments.offering",
				foreignField: "_id",
				as: "offering",
			},
		},

		{
			$unwind: "$offering",
		},

		{
			$match: {
				"offering.status": OFFERING_STATUS.ACTIVE,
				"offering.visibility": OFFERING_VISIBILITY.PUBLIC,
				"offering.searchable": true,
			},
		},

		{
			$group: {
				_id: "$_id",
				offeringCount: {
					$sum: 1,
				},
				category: {
					$first: "$$ROOT",
				},
			},
		},

		{
			$sort: {
				offeringCount: -1,
				"category.position": 1,
				"category.name": 1,
			},
		},

		{
			$facet: {
				data: [
					{
						$skip: skip,
					},
					{
						$limit: limit,
					},
				],
				metadata: [
					{
						$count: "total",
					},
				],
			},
		},
	];

	const [result] = await Category.aggregate(pipeline);

	return {
		data: (result?.data ?? []).map((item) => ({
			...item.category,
			offeringCount: item.offeringCount,
		})),
		total: result?.metadata?.[0]?.total ?? 0,
	};
}

export default {
	create,
	findById,
	findByBusinessAndId,
	findByBusinessAndSlug,
	findByBusiness,
	save,
	existsByBusinessAndSlug,

	findForMarketplace,
};
