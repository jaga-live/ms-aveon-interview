import Joi from 'joi';
import { Types } from 'mongoose';
import { ValidationException } from '../../../core/exception';

export class CreateCandidateDto{
	constructor(
        public name: string,
        public email: string,
        public phone: number,
        public createdAt?: Date,
        public hrId?: Types.ObjectId,
	) { }
    
	static async validate(dto: CreateCandidateDto) {
		if (!dto) return;

		const schema = Joi.object({
			name: Joi.string().required(),
			email: Joi.string().required(),
			phone: Joi.number().required(),
		});

		const validate = schema.validateAsync(dto).catch(err => {
			throw new ValidationException(err);
		});

		return validate;
	}
}