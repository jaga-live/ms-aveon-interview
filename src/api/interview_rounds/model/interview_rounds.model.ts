import { model, Schema, Types } from 'mongoose';

interface InterviewRound{
	round_type: string,
	meeting_link: string,
    date: Date,
    status: string,
    candidateId: string,
    createdAt: Date
}

const InterviewRoundSchema = new Schema({
	round_type: String,
	meeting_link: {
		type: String,
		default: null
	},
	date: Date,
	status: {
		type: String,
		default: 'scheduled'
	},
	candidateId: Types.ObjectId,
	createdAt: {
		type: Date,
		default: new Date()
	}
});


export default model<InterviewRound>('interview_round', InterviewRoundSchema);