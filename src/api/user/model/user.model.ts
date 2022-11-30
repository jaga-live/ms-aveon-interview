import { Types } from 'mongoose';
import { model, Schema } from 'mongoose';

export interface IUser{
    _id: Types.ObjectId,
    name: string,
    email: string,
    role: string
}

const UserSchema = new Schema({
	name: String,
	email: String,
	role: String
});


export default model<IUser>('users', UserSchema);