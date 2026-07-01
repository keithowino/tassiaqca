import Role from "../models/Role.js";

async function findById(id) {
	return Role.findById(id);
}

async function findBySlug(slug) {
	return Role.findOne({ slug });
}

async function findOwnerRole() {
	return Role.findOne({
		slug: "owner",
	});
}

async function create(role) {
	return Role.create(role);
}

export default {
	findById,
	findBySlug,
	findOwnerRole,
	create,
};
