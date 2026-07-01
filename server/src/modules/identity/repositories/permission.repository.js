import Permission from "../models/Permission.js";

async function findAll() {
	return Permission.find();
}

async function findByKey(key) {
	return Permission.findOne({
		key: key.toUpperCase(),
	});
}

async function findManyByKeys(keys) {
	return Permission.find({
		key: {
			$in: keys.map((key) => key.toUpperCase()),
		},
	});
}

export default {
	findAll,
	findByKey,
	findManyByKeys,
};
