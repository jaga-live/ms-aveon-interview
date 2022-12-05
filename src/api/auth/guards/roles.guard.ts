import {Response, NextFunction } from 'express';
import { Req } from '../../../core/custom_types/custom.types';
import { HttpException } from '../../../core/exception';

export const RolesGuard = (roles: any) => {
	return (req: Req, res: Response,next: NextFunction) => {
		const currentUser = req.userData?.role;
		if(!currentUser) throw new HttpException('Roles has no sufficient permissions', 403);
		if (!roles.includes(currentUser)) throw new HttpException('Roles has no sufficient permissions', 403);
		next();
	};
};