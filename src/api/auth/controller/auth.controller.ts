import { inject } from 'inversify';
import { controller, httpGet, httpPost, requestBody } from 'inversify-express-utils';
import { ApiOperationGet, ApiOperationPost, ApiPath } from 'swagger-express-ts';
import { Req } from '../../../core/custom_types/custom.types';
import { TYPES } from '../../../core/inversify/types.di';
import { RefreshToken } from '../middleware/refresh.auth';
import { AuthService } from '../service/auth.service';


@ApiPath({path: '/auth', name: 'Authentication'})
@controller('/auth')
export class AuthController{
	constructor(
        @inject(TYPES.AuthService) private readonly authService: AuthService
	) { }
    
	///User Login
	@ApiOperationPost({
		description: 'User Login',
	    path: '/login',
	    parameters : {
	    	body : { description : 'User Login DTO', required : true, model: 'Login'}
	    },
	    responses : {
	    	200 : { description : 'Success' },
	    	400 : { description : 'Parameters fail' }
	    }
	})
    @httpPost('/login')
	async login(@requestBody() req: any) {
		const { email, password } = req;
		return this.authService.login(email, password);
	}
	
	

	///Get Access Token from Refresh Token
	@ApiOperationGet({
		description: 'Get Access token with Refresh token',
		path: '/token/refresh',
	    parameters : {
			header: {
				'x-refresh-token': {description: 'Pass Refresh token in headers'}
			}
	    },
	    responses : {
	    	200 : { description : 'Success' },
	    	401 : { description : 'Refresh Token Expired' }
	    }
	})
    @httpGet('/token/refresh', RefreshToken)
	    async refreshAccessToken(req: Req) {
    	return {accessToken: req.accessToken};
	}
}