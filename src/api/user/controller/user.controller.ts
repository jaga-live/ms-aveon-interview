import { Request } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { Types } from 'mongoose';
import { Req } from '../../../core/custom_types/custom.types';
import { TYPES } from '../../../core/inversify/types.di';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { CreateUserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';

@controller('/user')
export class UserController{
	constructor(
        @inject(TYPES.UserService) private readonly userService: UserService
	) { }
    
	///Create User
    @httpPost('')
	async createUser(req: Request) {
		const validate =  await CreateUserDto.validate(req.body);
		const createUser = await this.userService.create_user(validate);
		return createUser;
	}

	///User Profile
	@httpGet('/profile', AuthGuard)
    async profile(req: Req) {
    	const { userId } = req.userData;
    	return this.userService.profile(new Types.ObjectId(userId));
    }
}