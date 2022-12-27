import { inject } from 'inversify';
import { Types } from 'mongoose';
import { HttpException } from '../../../core/exception';
import { TYPES } from '../../../core/inversify/types.di';
import { CandidateRepository } from '../repository/candidate.repository';
import { CreateCandidateDto } from '../_dto/create_candidate.dto';


export class CandidateService{
	constructor(
        @inject(TYPES.CandidateRepository) private readonly candidateRepo: CandidateRepository
	) { }
    
	async create_candidate(payload: CreateCandidateDto, hrId: Types.ObjectId) {
		///Check if Candidate Exists
		const candidate = await this.candidateRepo.findByEmail(payload.email);
		if (candidate) throw new HttpException('Email Already Exists', 409);
        
		return await this.candidateRepo.create(payload);
	}
}