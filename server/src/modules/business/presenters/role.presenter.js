class RolePresenter {
	present(role) {
		if (!role) {
			return null;
		}

		return {
			id: role.id,
			name: role.name,
			slug: role.slug,
			description: role.description,
		};
	}

	presentMany(roles) {
		return roles.map((role) => this.present(role));
	}
}

export default new RolePresenter();
