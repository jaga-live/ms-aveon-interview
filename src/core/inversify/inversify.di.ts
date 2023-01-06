import 'reflect-metadata';
import { Container } from 'inversify';

const container = new Container({
	defaultScope: 'Singleton'
});


///Import Controller
import './global.controller';
import { UserRepository } from '../../api/user/repository/user.repository';
import { TYPES } from './types.di';
import { UserService } from '../../api/user/service/user.service';
import { AuthRepository } from '../../api/auth/repository/auth.repository';
import { AuthService } from '../../api/auth/service/auth.service';
import { CandidateService } from '../../api/candidate/service/candidate.service';
import { CandidateRepository } from '../../api/candidate/repository/candidate.repository';
import { InterviewRoundRepo } from '../../api/interview_rounds/repository/interview_round.repo';
import { InterviewRoundService } from '../../api/interview_rounds/service/interview_round.service';

///Bindings
///Service
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<AuthService>(TYPES.AuthService).to(AuthService);
container.bind<CandidateService>(TYPES.CandidateService).to(CandidateService);
container.bind<InterviewRoundService>(TYPES.InterviewRoundService).to(InterviewRoundService);

///Repository
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<AuthRepository>(TYPES.AuthRepository).to(AuthRepository);
container.bind<CandidateRepository>(TYPES.CandidateRepository).to(CandidateRepository);
container.bind<InterviewRoundRepo>(TYPES.InterviewRoundRepository).to(InterviewRoundRepo);

export default container;