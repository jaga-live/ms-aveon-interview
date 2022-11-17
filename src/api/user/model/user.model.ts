import { model, Schema } from 'mongoose';

export interface IUser{
    name: string,
    emai: string
}

const UserSchema = new Schema({
	name: String,
	email: String,
});


export default model<IUser>('users', UserSchema);