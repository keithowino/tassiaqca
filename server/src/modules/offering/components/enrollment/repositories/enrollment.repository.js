import { OfferingEnrollment } from "../models/index.js";

class EnrollmentRepository {
	async create(data) {
		return OfferingEnrollment.create(data);
	}

	async findByOffering(offeringId) {
		return OfferingEnrollment.findOne({
			offering: offeringId,
		});
	}

	async findByBusinessAndOffering(businessId, offeringId) {
		return OfferingEnrollment.findOne({
			business: businessId,
			offering: offeringId,
		});
	}

	async save(enrollment) {
		return enrollment.save();
	}

	async deleteByOffering(offeringId) {
		return OfferingEnrollment.deleteOne({
			offering: offeringId,
		});
	}
}

export const enrollmentRepository = new EnrollmentRepository();

export default enrollmentRepository;
