import BusinessMember from "../models/BusinessMember.js";

async function create(memberData) {
	return BusinessMember.create(memberData);
}

async function findById(id) {
	return BusinessMember.findById(id);
}

// Is this user a member of this business?
async function findByUserAndBusiness(userId, businessId) {
	return BusinessMember.findOne({
		user: userId,
		business: businessId,
	});
}

/**
|--------------------------------------------------
| 	This method was removed to avoid duplications

|	async function findMembers(businessId) {
|		return BusinessMember.find({
|			business: businessId,
|		})
|			.populate("user")
|			.populate("role");
|	}
|--------------------------------------------------
*/

async function exists(userId, businessId) {
	const member = await BusinessMember.exists({
		user: userId,
		business: businessId,
	});

	return member !== null;
}

async function findByBusiness(businessId) {
	return BusinessMember.find({
		business: businessId,
	})
		.populate("user")
		.populate("role");
}

// Give me the active membership together with the role and all permissions.
async function findActiveMember(userId, businessId) {
	return BusinessMember.findOne({
		user: userId,
		business: businessId,
		active: true,
	}).populate({
		path: "role",
		populate: {
			path: "permissions",
		},
	});
}

async function remove(member) {
	return member.deleteOne();
}

async function save(member) {
	return member.save();
}

export default {
	create,
	findById,
	findByUserAndBusiness,
	// findMembers,
	exists,
	findByBusiness,
	findActiveMember,
	remove,
	save,
};
