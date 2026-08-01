class BranchPresenter {
	present(branch) {
		return {
			id: branch.id,

			name: branch.name,
			slug: branch.slug,

			description: branch.description,

			phone: branch.phone,
			email: branch.email,

			address: branch.address,
			city: branch.city,
			county: branch.county,

			latitude: branch.latitude,
			longitude: branch.longitude,

			active: branch.active,
			isHeadOffice: branch.isHeadOffice,

			createdAt: branch.createdAt,
			updatedAt: branch.updatedAt,
		};
	}

	presentCollection(branches) {
		return branches.map((branch) => this.present(branch));
	}
}

export default new BranchPresenter();
