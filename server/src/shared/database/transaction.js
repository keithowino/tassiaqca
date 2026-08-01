import mongoose from "mongoose";

/**
 * Executes a unit of work inside a MongoDB transaction.
 *
 * @param {(session: mongoose.ClientSession) => Promise<any>} work
 * @returns {Promise<any>}
 */
export const withTransaction = async (work) => {
	const session = await mongoose.startSession();

	try {
		let result;

		await session.withTransaction(async () => {
			result = await work(session);
		});

		return result;
	} finally {
		await session.endSession();
	}
};
