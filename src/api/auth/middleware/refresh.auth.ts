import { NextFunction, Response } from 'express';
import { HttpException } from '../../../core/exception';
import Auth from '../../auth/model/auth.model';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { v4 } from 'uuid';
import { Req } from '../../../core/custom_types/custom.types';
import { IUser } from '../../user/model/user.model';
import User from '../..//user/model/user.model';

export const RefreshToken = async (req: Req, res: Response, next: NextFunction) => {
	try {
		const refreshToken: any = (req.headers['x-refresh-token']);
		if (!refreshToken) throw new HttpException('Refresh Token Missing in request headers', 401);
		///Validate JWt
		const {userId}: any = jwt.verify(refreshToken, process.env.JWT_SECRET);

		////Create Access Token
		const {email, role}: IUser = await User.findOne({ _id: userId });
		const sessionId = v4();

		const jwtToken = jwt.sign({
			userId,
			email,
			role,
			sessionId
		}, process.env.JWT_SECRET, { expiresIn: '30s' });

		///Update Session
		await Auth.updateOne({ userId }, {
			$push: { jwtSession: sessionId }
		});

		req.accessToken = jwtToken;
		next();
		
	} catch (error) {
		return res.status(401).send({error: 'Not Authorized'});
	}


};