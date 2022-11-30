import { inject } from 'inversify';
import { controller, httpPost, requestBody } from 'inversify-express-utils';
import { TYPES } from '../../../core/inversify/types.di';
import { AuthService } from '../service/auth.service';


@controller('/auth')
export class AuthController{
	constructor(
        @inject(TYPES.AuthService) private readonly authService: AuthService
	) { }
    
    @httpPost('/login')
	async login(@requestBody() req: any) {
		const { email, password } = req;
		return this.authService.login(email, password);
	}
}