import { model, Schema, Types } from 'mongoose';


interface ICandidate{
    name: string,
    email: string,
    phone: number,
    createdAt: Date,
    hrId: string
}

const CandidateSchema = new Schema({
	name: String,
	email: {
		type: String,
		unique: true
	},
	phone: Number,
	createdAt: Date,
	hrId: Types.ObjectId
});


export default model<ICandidate>('candidate', CandidateSchema);