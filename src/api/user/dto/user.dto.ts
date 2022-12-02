import Joi from 'joi';
import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { HttpException, ValidationException } from '../../../core/exception';
import { ROLES } from '../enum/roles';

@ApiModel({name: 'CreateUser'})
export class CreateUserDto{
	@ApiModelProperty({ required: true, example: 'John Adam' })
	public name: string;

	@ApiModelProperty({ required: true, example: 'john@aveoninfotech.com' })
	public email: string;

	@ApiModelProperty({ required: true, example: 'HR' })
	public role: string;

	@ApiModelProperty({ required: true, example: 'password' })
	public password: string;
	
	public static async validate(dto: CreateUserDto) {
		if (!dto) return;

		const schema = Joi.object({
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			role: Joi.string().valid(
				ROLES.ADMIN,
				ROLES.HR
			).required(),
			password: Joi.string().required()
		});

		const validate = schema.validateAsync(dto).catch(err => {
			throw new ValidationException(err);
		});

		return validate;
	}

}

@ApiModel({name: 'User'})
export class UserDto{
	@ApiModelProperty({ required: true, example: 'John Adam' })
	public name: string;

	@ApiModelProperty({ required: true, example: 'john@aveoninfotech.com' })
	public email: string;

	@ApiModelProperty({ required: true, example: 'HR' })
	public role: string;
}