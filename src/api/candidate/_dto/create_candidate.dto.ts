import Joi from 'joi';
import { ValidationException } from '../../../core/exception';

export class CreateCandidateDto{
	constructor(
        public name: string,
        public email: string,
        public phone: number,
        public createdAt?: Date,
        public hrId?: string,
	) { }
    
	static async validate(dto: CreateCandidateDto) {
		if (!dto) return;

		const schema = Joi.object({
			name: Joi.string().required(),
			email: Joi.string().required(),
			phone: Joi.string().required(),
		});

		const validate = schema.validateAsync(dto).catch(err => {
			throw new ValidationException(err);
		});

		return validate;
	}
}