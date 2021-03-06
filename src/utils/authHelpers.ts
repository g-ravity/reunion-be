import { NextFunction, Request } from 'express';
import { verify } from 'jsonwebtoken';
import { IResponse } from '../types/General';
import { ICleanUser } from '../types/User';
import { logger } from './logger';

export const checkJWT = async (req: Request, res: IResponse, next: NextFunction) => {
	const { authorization } = req.headers;
	if (!authorization) {
		res.status(401).send('Unauthorized Error');
	}

	try {
		const authToken = authorization.split(' ')[1];
		const user = verify(authToken, process.env.JWT_SECRET) as ICleanUser;

		Object.assign(req, { user: { ...user } });

		return next();
	} catch (error) {
		logger.error('Error while parsing JWT: ', error);
		res.status(401).send('Unauthorized Error');
	}
};
