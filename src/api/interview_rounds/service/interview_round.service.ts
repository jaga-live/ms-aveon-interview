import { inject, injectable } from 'inversify';
import { Types } from 'mongoose';
import { HttpException } from '../../../core/exception';
import { TYPES } from '../../../core/inversify/types.di';
import { InterviewRoundRepo } from '../repository/interview_round.repo';

@injectable()
export class InterviewRoundService{
	constructor(
        @inject(TYPES.InterviewRoundRepository) private readonly interviewRoundRepo: InterviewRoundRepo
	){}

    	async create_interview_round(payload: any, hrId: Types.ObjectId) {
		payload.hrId = hrId;
		return await this.interviewRoundRepo.create(payload);
	}

	///Find by HR id
	async find_by_hrId(_id: Types.ObjectId) {
		return await this.interviewRoundRepo.findByHrId(_id);
	}
}