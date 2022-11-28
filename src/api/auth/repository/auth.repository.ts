import { injectable } from 'inversify';
import Auth from '../model/auth.model';

@injectable()
export class AuthRepository{
	async create(payload: any): Promise<void> {
		const auth = new Auth(payload);
		await auth.save();
	}
}