import { inject, injectable } from 'inversify';
import { TYPES } from '../../../core/inversify/types.inversify';
import { CreateUserDto } from '../dto/user.dto';
import { UserRepository } from '../repository/user.repository';

@injectable()
export class UserService{
	constructor(
        @inject(TYPES.UserRepository) private readonly userRepo: UserRepository
	) { }
    
	async create_user(payload: CreateUserDto) {
		const { email } = payload;
        
		///Check if user exists
		const userExists = await this.userRepo.findByEmail(email);
		if (userExists) return 'user already exists';
        
		///Create User
		const createUser = await this.userRepo.create(payload);
		return createUser;
	}

}