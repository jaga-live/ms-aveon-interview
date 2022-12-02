import { Request } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { Types } from 'mongoose';
import { ApiOperationGet, ApiOperationPost, ApiPath } from 'swagger-express-ts';
import { Req } from '../../../core/custom_types/custom.types';
import { TYPES } from '../../../core/inversify/types.di';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { CreateUserDto } from '../dto/user.dto';
import { ROLES } from '../enum/roles';
import { UserService } from '../service/user.service';

@ApiPath({name: 'Users', path: '/user'})
@controller('/user')
export class UserController{
	constructor(
        @inject(TYPES.UserService) private readonly userService: UserService
	) { }
    
	///Create User
	@ApiOperationPost({
		path: '/',
		parameters: { body: { model: 'CreateUser' } },
		responses: {
			200: { description: 'Successful User creation' },
			400: { description: 'Bad Payload' }
		}
	})
    @httpPost('')
	async createUser(req: Request) {
		const validate =  await CreateUserDto.validate(req.body);
		const createUser = await this.userService.create_user(validate);
		return createUser;
	}

	@ApiOperationGet({
		responses: {
			200: { model: 'User' },
			401: { description: 'Unauthorized Exception' },
		}
	})
	///User Profile
	@httpGet('/profile',
		AuthGuard,
		RolesGuard([ROLES.ADMIN, ROLES.HR]))
	async profile(req: Req) {
    	const { userId } = req.userData;
    	return this.userService.profile(new Types.ObjectId(userId));
	}
}