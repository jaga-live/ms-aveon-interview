import { model, Schema, Types } from 'mongoose';

interface InterviewRound{
    round_type: string,
    date: Date,
    status: string,
    candidateId: string,
    createdAt: Date
}

const InterviewRoundSchema = new Schema({
	round_type: String,
	date: Date,
	status: {
		type: String,
		default: 'scheduled'
	},
	candidateId: Types.ObjectId,
	createdAt: Date
});


export default model<InterviewRound>('interview_round', InterviewRoundSchema);
