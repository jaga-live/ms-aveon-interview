import { model, Schema } from 'mongoose';

export interface IUser{
    name: string,
    email: string
}

const UserSchema = new Schema({
	name: String,
	email: String,
});


export default model<IUser>('users', UserSchema);