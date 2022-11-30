import { compareSync } from 'bcrypt';
import { inject, injectable } from 'inversify';
import { HttpException } from '../../../core/exception';
import { TYPES } from '../../../core/inversify/types.di';
import { UserRepository } from '../../user/repository/user.repository';
import { AuthRepository } from '../repository/auth.repository';
import { v4 } from 'uuid';
import jwt from 'jsonwebtoken';
interface IAuthService{
	login(email:string, password: string): Promise<any>
}

@injectable()
export class AuthService implements IAuthService{
	private JWT_SECRET = process.env.JWT_SECRET;
	constructor(
        @inject(TYPES.UserRepository) private readonly userRepo: UserRepository,
        @inject(TYPES.AuthRepository) private readonly authRepo: AuthRepository,
	) {}

	async login<T>(email: string, password: string): Promise<any> {
		///Check if user exists
		const user = await this.userRepo.findByEmail(email);
		if (!user) throw new HttpException('Invalid email or password', 400);
		
		///Get Auth
		const auth = await this.authRepo.findByUserId(user._id);
		if (!auth) throw new Error(`Cannot find auth for the user ${user._id}`);
		
		if (!(compareSync(password, auth.password))) throw new HttpException('Invalid Email or Password', 400);
		
		////Create Session
		const sessionId = v4();

		////Access Token
		const accessToken = jwt.sign({
			userId: user._id,
			email,
			role: user.role,
			sessionId
		}, this.JWT_SECRET, { expiresIn: '60s' });

		////Refresh Token
		const refreshToken = jwt.sign({
			userId: user._id,
			sessionId
		}, this.JWT_SECRET, {expiresIn: '120s'});

		///Update Session
		await this.authRepo.update(auth._id, {
			$push: { jwtSession: sessionId }
		});

		return {
			status: 'ok',
			accessToken,
			refreshToken
		};
	}
}