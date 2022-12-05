import { Request } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPatch, httpPost } from 'inversify-express-utils';
import { Types } from 'mongoose';
import { ApiOperationGet, ApiOperationPatch, ApiOperationPost, ApiPath } from 'swagger-express-ts';
import { Req } from '../../../core/custom_types/custom.types';
import { HttpException } from '../../../core/exception';
import { TYPES } from '../../../core/inversify/types.di';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { UpdateUserDto } from '../dto/update_user.dto';
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
	@httpPost('', AuthGuard, RolesGuard([ROLES.ADMIN]))
	async createUser(req: Request) {
		const validate =  await CreateUserDto.validate(req.body);
		const createUser = await this.userService.create_user(validate);
		return createUser;
	}
	

	///User Profile
	@ApiOperationGet({
		path: '/profile',
		responses: {
			200: { model: 'User' },
			401: { description: 'Unauthorized Exception' },
		}
	})
	@httpGet('/profile',
		AuthGuard,
		RolesGuard([ROLES.ADMIN, ROLES.HR]))
	async profile(req: Req) {
    	const { userId } = req.userData;
    	return this.userService.profile(new Types.ObjectId(userId));
	}

	///Update Profile
	@ApiOperationPatch({
		path: '/profile',
		parameters: { body: { model: 'UpdateUser' } },
		responses: {
			200: { model: 'User' },
			401: { description: 'Unauthorized Exception' },
		}
	})
	@httpPatch('/profile',
		AuthGuard,
		RolesGuard([ROLES.ADMIN, ROLES.HR]))
	async updateProfile(req: Req) {
		const { userId } = req.userData;
		const validate: UpdateUserDto = await UpdateUserDto.validate(req.body);
		await this.userService.update_profile(new Types.ObjectId(userId), validate);
		return {
			message: 'User Updated'
		};
	}


	///Update User password
	@httpPatch('/profile/password', AuthGuard)
	async updatePassword(req: Req) {
		const {userId} = req.userData;
		const { newPassword, oldPassword } = req.body;
		
		if (!newPassword || !oldPassword) throw new HttpException('Bad Request', 400);
		
		await this.userService.update_password(userId, oldPassword, newPassword);
		return {
			message: 'Password changed'
		};
	}
}