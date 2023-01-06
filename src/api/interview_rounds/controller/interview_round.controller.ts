import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import { Req } from '../../../core/custom_types/custom.types';
import { TYPES } from '../../../core/inversify/types.di';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ROLES } from '../../user/enum/roles';
import { InterviewRoundService } from '../service/interview_round.service';
import { CreateInterviewRoundDto } from '../_dto/interview_round.dto';


@controller('/interview_round')
export class InterviewRoundController{
	constructor(
        @inject(TYPES.InterviewRoundService) private readonly interviewRoundService: InterviewRoundService
	){}

    @httpPost('', AuthGuard, RolesGuard([ROLES.HR]))
	async create_rounds(req: Req) {
		const { userId } = req.userData;
		const createPayload =  await CreateInterviewRoundDto.validate(req.body);
		return await this.interviewRoundService.create_interview_round(createPayload, userId);
	}
}
