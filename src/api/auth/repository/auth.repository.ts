import { injectable } from 'inversify';
import { Types } from 'mongoose';
import Auth from '../model/auth.model';

@injectable()
export class AuthRepository{
	async create(payload: any): Promise<void> {
		const auth = new Auth(payload);
		await auth.save();
	}

	async findByUserId(userId: Types.ObjectId) {
		const auth = await Auth.findOne({ userId });
		return auth;
	}

	async update(_id: Types.ObjectId, expression: any) {
		await Auth.updateOne({ _id }, { ...expression });
	}

	
}