import 'dotenv/config';
import { connect } from 'mongoose';

export class MongoDB{
	private MONGO_URI = process.env.MONGO_DEV;
	connect() {
		connect(this.MONGO_URI)
			.then(res =>console.log('MongoDB Connected'))
			.catch(err=>console.log(err));
	}
}