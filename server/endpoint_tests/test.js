const t = {
	success: true,
	message: "Featured marketplace offerings retrieved successfully.",
	data: {
		data: [
			{
				id: "6a927def6af38dc49ad4f75d",
				businessId: "6a9017d39104fee22462410a",
				type: "PRODUCT",
				name: "Marketplace Test Product",
				slug: "marketplace-test-product",
				shortDescription:
					"A product created to verify Marketplace aggregation.",
				description:
					"This offering is being created specifically to verify that published Marketplace-visible offerings are returned by the Marketplace API.",
				visibility: "PUBLIC",
				featured: true,
				metadata: {},
			},
		],
		pagination: { total: 1, page: 1, limit: 20, totalPages: 1 },
	},
};
