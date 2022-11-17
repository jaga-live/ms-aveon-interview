import 'reflect-metadata';
import { Container } from 'inversify';

const container = new Container({
	defaultScope: 'Singleton'
});


///Import Controller
import '../../api/user/controller/user.controller';
import { UserRepository } from '../../api/user/repository/user.repository';
import { TYPES } from './types.inversify';
import { UserService } from '../../api/user/service/user.service';

///Bindings
///Service
container.bind<UserService>(TYPES.UserService).to(UserService);

///Repository
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);

export default container;