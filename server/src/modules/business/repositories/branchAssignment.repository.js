import { BranchAssignment } from "../models/index.js";

async function create(data) {
	return BranchAssignment.create(data);
}

async function save(assignment) {
	return assignment.save();
}

async function findById(id) {
	return BranchAssignment.findById(id);
}

async function findByMemberAndBranch(businessMemberId, branchId) {
	return BranchAssignment.findOne({
		businessMember: businessMemberId,
		branch: branchId,
	});
}

async function findActiveByMemberAndBranch(businessMemberId, branchId) {
	return BranchAssignment.findOne({
		businessMember: businessMemberId,
		branch: branchId,
		active: true,
	});
}

async function findByBranch(branchId) {
	return BranchAssignment.find({
		branch: branchId,
		active: true,
	})
		.populate({
			path: "businessMember",
			populate: {
				path: "user role",
			},
		})
		.sort({
			createdAt: 1,
		});
}

async function findByMember(businessMemberId) {
	return BranchAssignment.find({
		businessMember: businessMemberId,
		active: true,
	})
		.populate("branch")
		.sort({
			createdAt: 1,
		});
}

async function findInactiveByMemberAndBranch(businessMemberId, branchId) {
	return BranchAssignment.findOne({
		businessMember: businessMemberId,
		branch: branchId,
		active: false,
	});
}

async function findPrimaryByMember(businessMemberId) {
	return BranchAssignment.findOne({
		businessMember: businessMemberId,
		active: true,
		primary: true,
	});
}

async function findActiveByMember(businessMemberId) {
	return BranchAssignment.find({
		businessMember: businessMemberId,
		active: true,
	});
}

async function clearPrimary(businessMemberId) {
	return BranchAssignment.updateMany(
		{
			businessMember: businessMemberId,
			active: true,
			primary: true,
		},
		{
			primary: false,
		},
	);
}

async function countActiveByMember(businessMemberId) {
	return BranchAssignment.countDocuments({
		businessMember: businessMemberId,
		active: true,
	});
}

async function findFirstActiveByMember(businessMemberId) {
	return BranchAssignment.findOne({
		businessMember: businessMemberId,
		active: true,
	}).sort({
		createdAt: 1,
	});
}

export default {
	create,
	save,
	findById,
	findByMemberAndBranch,
	findActiveByMemberAndBranch,
	findByBranch,
	findByMember,
	findInactiveByMemberAndBranch,
	findPrimaryByMember,
	findActiveByMember,
	clearPrimary,
	countActiveByMember,
	findFirstActiveByMember,
};
