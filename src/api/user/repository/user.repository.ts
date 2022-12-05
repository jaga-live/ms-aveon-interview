import { injectable } from 'inversify';
import { Types } from 'mongoose';
import { CreateUserDto } from '../dto/user.dto';
import User, { IUser } from '../model/user.model';

export interface IUserService{
	create(payload: CreateUserDto): Promise<IUser>
	findById(userId: Types.ObjectId): Promise<IUser>
	findByEmail(email: string): Promise<IUser>
}
@injectable()
export class UserRepository implements IUserService{
	
	///Create Single User
	async create(payload: CreateUserDto): Promise<IUser> {
		const user: any = new User(payload);

		let createUser = await user.save();
		createUser = createUser.toObject();
		return createUser;
	}

	///Find User by userId;
	async findById(userId: Types.ObjectId): Promise<IUser> {
		const user = await User.findOne({ _id: userId });
		return user;
	}
	///Find User by Email
	async findByEmail(email: string): Promise<IUser> {
		const user = await User.findOne({ email });
		return user;
	}

	///Update User
	async update(userId: Types.ObjectId, payload: any) {
		
		await User.updateOne({ _id: userId }, {
			$set: {...payload}
			
		});
	}
}