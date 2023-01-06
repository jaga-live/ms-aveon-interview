import { injectable } from 'inversify';
import { Types } from 'mongoose';
import InterviewRounds from '../model/interview_rounds.model';

@injectable()
export class InterviewRoundRepo{

    	///Create a Interview Round
	async create(payload: any): Promise<any> {
		const candidate = new InterviewRounds(payload);
		return await candidate.save();
	}

	//Find by _id
	async findById(_id: Types.ObjectId) {
		const candidate = await InterviewRounds.find({ _id });
		return candidate;
	}

	///Find by hrId
	async findByHrId(_id: Types.ObjectId) {
		const candidate = await InterviewRounds.find({ hrId: _id });
		return candidate;
	}

	//Find by _id
	async findByEmail(email: string) {
		const candidate = await InterviewRounds.findOne({ email });
		return candidate;
	}
}