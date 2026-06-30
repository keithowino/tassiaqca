/**
|--------------------------------------------------
| Repositories only know how to talk to MongoDB.
|--------------------------------------------------
*/
import User from "../models/User.js";

async function create(userData) {
	return User.create(userData);
}

async function findById(id) {
	return User.findById(id);
}

async function findByEmail(email) {
	if (!email) {
		return null;
	}

	return User.findOne({
		email: email.toLowerCase(),
	});
}

// async function findByEmailWithRefreshToken(email) {
// 	return User.findOne({
// 		email: email.toLowerCase(),
// 	}).select("+refreshToken");
// }

// async function findByIdWithRefreshToken(id) {
// 	return User.findById(id).select("+refreshToken");
// }

async function save(user) {
	return user.save();
}

export default {
	create,
	findById,
	findByEmail,
	// findByEmailWithRefreshToken,
	// findByIdWithRefreshToken,
	save,
};
