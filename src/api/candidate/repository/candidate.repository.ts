import { injectable } from 'inversify';
import { Types } from 'mongoose';
import Candidate from '../model/candidate.model';
import { CreateCandidateDto } from '../_dto/create_candidate.dto';


@injectable()
export class CandidateRepository{
	constructor() { }
    
	///Create Single or Multiple
	async create(payload: CreateCandidateDto | CreateCandidateDto[]): Promise<any> {
		const candidate = new Candidate(payload);
		return await candidate.save();
	}

	//Find by _id
	async findById(_id: Types.ObjectId) {
		const candidate = await Candidate.find({ _id });
		return candidate;
	}

	//Find by _id
	async findByEmail(email: string) {
		const candidate = await Candidate.findOne({ email });
		return candidate;
	}

}