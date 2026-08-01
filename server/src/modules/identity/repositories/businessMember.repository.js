import BusinessMember from "../models/BusinessMember.js";

// async function create(memberData, session = null) {
// 	if (!session) {
// 		return BusinessMember.create(memberData);
// 	}

// 	const [member] = await BusinessMember.create([memberData], {
// 		session,
// 	});

// 	return member;
// }
async function create(memberData, options = {}) {
	return BusinessMember.create([memberData], options).then(
		([document]) => document,
	);
}

async function findById(id) {
	return BusinessMember.findById(id).populate("user").populate("role");
}

/**
 * Is this user a member of this business?
 */
async function findByUserAndBusiness(userId, businessId) {
	return BusinessMember.findOne({
		user: userId,
		business: businessId,
	});
}

async function findByBusinessAndId(businessId, memberId) {
	return BusinessMember.findOne({
		_id: memberId,
		business: businessId,
	});
}

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

/**
 * Give me the active membership together with the role and all permissions.
 */
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

export const findByUser = (userId) =>
	BusinessMember.find({
		user: userId,
		active: true,
	});

// async function remove(member, session = null) {
// 	return member.deleteOne({ session });
// }

async function remove(member, options = {}) {
	return member.deleteOne(options);
}

// async function save(member, session = null) {
// 	return member.save({ session });
// }

async function save(member, options = {}) {
	return member.save(options);
}

async function countByBusinessAndRole(businessId, roleId) {
	return BusinessMember.countDocuments({
		business: businessId,
		role: roleId,
		active: true,
	});
}

export default {
	create,
	findById,
	findByUserAndBusiness,
	exists,
	findByBusiness,
	findActiveMember,
	findByUser,
	findByBusinessAndId,
	remove,
	save,
	countByBusinessAndRole,
};
