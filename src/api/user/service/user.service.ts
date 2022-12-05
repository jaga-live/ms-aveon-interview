import { inject, injectable } from 'inversify';
import { Types } from 'mongoose';
import { compareSync, hashSync } from 'bcrypt';
import { HttpException } from '../../../core/exception';
import { TYPES } from '../../../core/inversify/types.di';
import { AuthRepository } from '../../auth/repository/auth.repository';
import { CreateUserDto } from '../dto/user.dto';
import { UserRepository } from '../repository/user.repository';
import { UpdateUserDto } from '../dto/update_user.dto';

@injectable()
export class UserService{
	constructor(
		@inject(TYPES.UserRepository) private readonly userRepo: UserRepository,
		@inject(TYPES.AuthRepository) private readonly authRepo: AuthRepository
	) { }
    
	///Create User
	async create_user(payload: CreateUserDto) {
		const { email, password } = payload;
        
		///Check if user exists
		const userExists = await this.userRepo.findByEmail(email);
		if (userExists) throw new HttpException('User already Exists', 409);
        
		///Create User
		const createUser = await this.userRepo.create(payload);
		
		///Create Auth for User
		await this.authRepo.create({
			userId: new Types.ObjectId(createUser._id),
			password: hashSync(password, 12)
		});

		return createUser;
	}

	///Get User Profile
	async profile(userId: Types.ObjectId) {
		const user = await this.userRepo.findById(userId);
		return user;
	}

	///Update Profile
	async update_profile(userId: Types.ObjectId, payload: UpdateUserDto) {
		const user = await this.userRepo.findById(userId);
		if (!user) throw new HttpException('User not found', 400);
		
		await this.userRepo.update(userId, payload);
	}

	async update_password(userId: Types.ObjectId, oldPassword: string, newPassword: string) {
		const auth = await this.authRepo.findByUserId(userId);
		if (!compareSync(oldPassword, auth.password)) throw new HttpException('Old password does not match', 400);
		
		const payload: any = {
			$set: {
				password: hashSync(newPassword, 12)
			}
		};
		
		await this.authRepo.update(auth._id, payload);
	}

}