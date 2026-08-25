import { OfferingInstructor } from "../models/index.js";

class InstructorRepository {
	async create(data, session = null) {
		const [instructor] = await OfferingInstructor.create([data], {
			session,
		});

		return instructor;
	}

	async createMany(data, session = null) {
		if (!data.length) {
			return [];
		}

		return OfferingInstructor.insertMany(data, {
			session,
		});
	}

	async findByOffering(offeringId) {
		return OfferingInstructor.find({
			offering: offeringId,
		}).sort({
			createdAt: 1,
		});
	}

	async findByOfferingAndMember(offeringId, businessMemberId) {
		return OfferingInstructor.findOne({
			offering: offeringId,
			businessMember: businessMemberId,
		});
	}

	async deleteByOffering(offeringId, session = null) {
		return OfferingInstructor.deleteMany(
			{
				offering: offeringId,
			},
			{
				session,
			},
		);
	}
}

export const instructorRepository = new InstructorRepository();

export default instructorRepository;
