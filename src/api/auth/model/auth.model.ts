import { model, Schema, Types } from 'mongoose';


interface IAuth{
    userId: string;
	password: string;
	jwtSession: string[]
}

const AuthSchema = new Schema({
	userId: {
		type: Types.ObjectId,
		ref: 'users',
		unique: true,
	},
	password: String,
	jwtSession: Array<String>
});

export default model<IAuth>('auth', AuthSchema);