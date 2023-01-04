import { inject } from 'inversify';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { ApiPath } from 'swagger-express-ts';
import { Req } from '../../../core/custom_types/custom.types';
import { TYPES } from '../../../core/inversify/types.di';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ROLES } from '../../user/enum/roles';
import { CandidateService } from '../service/candidate.service';
import { CreateCandidateDto } from '../_dto/create_candidate.dto';

@ApiPath({path: '/candidate', name: 'Candidate'})
@controller('/candidate')
export class CandidateController{
	constructor(
        @inject(TYPES.CandidateService) private readonly candidateService: CandidateService
	) { }
    
    @httpPost('', AuthGuard, RolesGuard([ROLES.HR]))
	async create_candidate(req: Req) {
		const {userId} = req.userData;
		const validatePayload = await CreateCandidateDto.validate(req.body);
		
		return await this.candidateService.create_candidate(validatePayload, userId);
	}

	@httpGet('', AuthGuard, RolesGuard([ROLES.HR]))
    async get_candidates(req: Req) {
    	const { userId } = req.userData;
    	return await this.candidateService.find_by_hrId(userId);
    }
}