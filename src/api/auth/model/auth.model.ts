import { model, Schema, Types } from 'mongoose';


interface IAuth{
    userId: string;
    password: string;
}

const AuthSchema = new Schema({
	userId: {
		type: Types.ObjectId,
		ref: 'users',
		unique: true,
	},
	password: String
});

export default model<IAuth>('auth', AuthSchema);