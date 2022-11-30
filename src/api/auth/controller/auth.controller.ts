import { inject } from 'inversify';
import { controller, httpGet, httpPost, requestBody } from 'inversify-express-utils';
import { Req } from '../../../core/custom_types/custom.types';
import { TYPES } from '../../../core/inversify/types.di';
import { RefreshToken } from '../middleware/refresh.auth';
import { AuthService } from '../service/auth.service';


@controller('/auth')
export class AuthController{
	constructor(
        @inject(TYPES.AuthService) private readonly authService: AuthService
	) { }
    
	///User Login
    @httpPost('/login')
	async login(@requestBody() req: any) {
		const { email, password } = req;
		return this.authService.login(email, password);
	}

    ///get Access Token from Refresh Token
    @httpGet('/token/refresh', RefreshToken)
    async refreshAccessToken(req: Req) {
    	console.log(req.accessToken);
    	return {accessToken: req.accessToken};
        
    }
}