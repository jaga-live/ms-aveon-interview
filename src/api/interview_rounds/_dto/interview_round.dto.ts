import Joi from 'joi';
import { Types } from 'mongoose';
import { ValidationException } from '../../../core/exception';


export class CreateInterviewRoundDto{
	constructor(
        public round_type: string,
        public date: Date,
        public candidateId: Types.ObjectId,
        public meeting_link?: string,
	) { }
    
	public static async validate(dto: CreateInterviewRoundDto) {
		if (!dto) return;

		const schema = Joi.object({
			round_type: Joi.string().required(),
			date: Joi.string().required(),
			candidateId: Joi.string().required(),
			meeting_link: Joi.string(),
		});

		const validate = schema.validateAsync(dto).catch(err => {
			throw new ValidationException(err);
		});

		return validate;
	}
}