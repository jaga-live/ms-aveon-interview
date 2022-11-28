import Joi from 'joi';
import { HttpException, ValidationException } from '../../../core/exception';


export class CreateUserDto{
	constructor(
        public name: string,
        public email: string,
        public password: string,
	) { }
    
	public static async validate(dto: CreateUserDto) {
		if (!dto) return;

		const schema = Joi.object({
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().required()
		});

		const validate = schema.validateAsync(dto).catch(err => {
			throw new ValidationException(err);
		});

		return validate;
	}

}