import 'reflect-metadata';
import { Container } from 'inversify';

const container = new Container({
	defaultScope: 'Singleton'
});


///Import Controller
import '../../api/user/controller/user.controller';
import { UserRepository } from '../../api/user/repository/user.repository';
import { TYPES } from './types.di';
import { UserService } from '../../api/user/service/user.service';
import { AuthRepository } from '../../api/auth/repository/auth.repository';
import { AuthService } from '../../api/auth/service/auth.service';

///Bindings
///Service
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<AuthService>(TYPES.AuthService).to(AuthService);

///Repository
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<AuthRepository>(TYPES.AuthRepository).to(AuthRepository);

export default container;