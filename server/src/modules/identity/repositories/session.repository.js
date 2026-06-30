import Session from "../models/Session.js";

async function create(sessionData) {
	return Session.create(sessionData);
}

async function save(session) {
	return session.save();
}

async function findById(id) {
	return Session.findById(id);
}

async function findByUser(userId) {
	return Session.find({
		user: userId,
	});
}

async function findActiveByUser(userId) {
	return Session.find({
		user: userId,
		isRevoked: false,
	});
}

async function findByRefreshTokenHash(hash) {
	return Session.findOne({
		refreshTokenHash: hash,
		isRevoked: false,
	});
}

async function revoke(session) {
	session.isRevoked = true;

	session.revokedAt = new Date();

	return session.save();
}

async function revokeAll(userId) {
	return Session.updateMany(
		{
			user: userId,
			isRevoked: false,
		},
		{
			isRevoked: true,
			revokedAt: new Date(),
		},
	);
}

export default {
	create,
	save,
	findById,
	findByUser,
	findActiveByUser,
	findByRefreshTokenHash,
	revoke,
	revokeAll,
};
