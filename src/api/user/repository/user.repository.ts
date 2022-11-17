import { injectable } from 'inversify';
import { CreateUserDto } from '../dto/user.dto';
import User from '../model/user.model';

@injectable()
export class UserRepository{
	
	///Create Single User
	async create(payload: CreateUserDto) {
		const user: any = new User(payload);

		let createUser = await user.save();
		createUser = createUser.toObject();
		return createUser;
	}

	///Find User by Query
	async findByEmail(email: string) {
		const user = await User.findOne({ email });
		return user;
	}
}