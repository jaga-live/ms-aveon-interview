import { Request } from 'express';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import { TYPES } from '../../../core/inversify/types.di';
import { CreateUserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';

@controller('/user')
export class UserController{
	constructor(
        @inject(TYPES.UserService) private readonly userService: UserService
	) { }
    
    @httpPost('')
	async createUser(req: Request) {
		const validate =  await CreateUserDto.validate(req.body);
		const createUser = await this.userService.create_user(validate);
		return createUser;
	}
}