import { model, Schema } from 'mongoose';

export interface IUser{
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