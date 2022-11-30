import Joi from 'joi';
import { HttpException, ValidationException } from '../../../core/exception';
import { ROLES } from '../enum/roles';


export class CreateUserDto{
	constructor(
        public name: string,
		public email: string,
		public role: string,
        public password: string,
	) { }
    
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