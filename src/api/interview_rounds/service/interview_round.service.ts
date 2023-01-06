import { inject, injectable } from 'inversify';
import { Types } from 'mongoose';
import { HttpException } from '../../../core/exception';
import { TYPES } from '../../../core/inversify/types.di';
import { CandidateRepository } from '../../candidate/repository/candidate.repository';
import { InterviewRoundRepo } from '../repository/interview_round.repo';

@injectable()
export class InterviewRoundService{
	constructor(
        @inject(TYPES.InterviewRoundRepository) private readonly interviewRoundRepo: InterviewRoundRepo,
        @inject(TYPES.CandidateRepository) private readonly candidateRepo: CandidateRepository,
	){}

	async create_interview_round(payload: any, hrId: Types.ObjectId) {
		///Check if candidate valid
		const candidate = await this.candidateRepo.findById(payload.candidateId);
		if (!candidate) throw new HttpException('Candidate not found', 400);
		
		payload.hrId = hrId;
		return await this.interviewRoundRepo.create(payload);
	}

	///Find by HR id
	async find_by_hrId(_id: Types.ObjectId) {
		return await this.interviewRoundRepo.findByHrId(_id);
	}
}