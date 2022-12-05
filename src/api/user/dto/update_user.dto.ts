import Joi from 'joi';
import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { ValidationException } from '../../../core/exception';


@ApiModel({name: 'UpdateUser'})
export class UpdateUserDto{
	@ApiModelProperty({ required: true, example: 'John Adam' })
	public name: string;

	public static async validate(dto: UpdateUserDto) {
		if (!dto) return;

		const schema = Joi.object({
			name: Joi.string(),
		});

		const validate = schema.validateAsync(dto).catch(err => {
			throw new ValidationException(err);
		});

		return validate;
	}

}