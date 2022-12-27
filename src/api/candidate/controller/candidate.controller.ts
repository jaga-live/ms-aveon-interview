import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import { Req } from '../../../core/custom_types/custom.types';
import { TYPES } from '../../../core/inversify/types.di';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ROLES } from '../../user/enum/roles';
import { CandidateService } from '../service/candidate.service';
import { CreateCandidateDto } from '../_dto/create_candidate.dto';

@controller('/candidate')
export class CandidateController{
	constructor(
        @inject(TYPES.CandidateService) private readonly candidateService: CandidateService
	) { }
    
    @httpPost('', AuthGuard, RolesGuard[ROLES.HR])
	async create_candidate(req: Req) {
		const {userId} = req.userData;
		const validatePayload = await CreateCandidateDto.validate(req.body);

		await this.candidateService.create_candidate(validatePayload, userId);
	}
}