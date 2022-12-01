import 'reflect-metadata';
import { ApiModel, ApiModelProperty } from 'swagger-express-ts';

@ApiModel({
	name: 'Login',
	description: 'UserLoginDTO'
})
export class LoginDto{
        @ApiModelProperty( {
        	description : 'Email @aveoninfotech.com' ,
        	required : true,
        	example: 'jaga@aveoninfotech.com'
        } )
        	email: string;
    
        @ApiModelProperty( {
        	description : 'Password' ,
        	required : true,
        	example: 'password'
        } )
        	password: string;
}