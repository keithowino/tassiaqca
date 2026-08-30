class BusinessSearchPresenter {
	present(result) {
		return {
			data: result.businesses,
			pagination: {
				total: result.total,
				page: result.page,
				limit: result.limit,
				totalPages: result.totalPages,
			},
		};
	}
}

export default new BusinessSearchPresenter();
