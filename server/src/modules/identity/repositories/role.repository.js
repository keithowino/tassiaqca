import Role from "../models/Role.js";

async function findById(id) {
	return Role.findById(id).populate("permissions");
}

async function findBySlug(slug) {
	return Role.findOne({ slug }).populate("permissions");
}

async function findOwnerRole() {
	return Role.findOne({
		slug: "owner",
	}).populate("permissions");
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
