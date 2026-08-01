class UserPresenter {
	present(user) {
		if (!user) {
			return null;
		}

		return {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			avatar:
				user.avatar && Object.keys(user.avatar).length > 0
					? user.avatar
					: null,
		};
	}

	presentMany(users) {
		return users.map((user) => this.present(user));
	}
}

export default new UserPresenter();
