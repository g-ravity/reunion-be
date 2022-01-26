import { NextFunction, Request } from 'express';
import { Express } from 'express-serve-static-core';
import { IResponse } from '../types';

const upgradeResponse = (app: Express) =>
	app.use((req: Request, res: IResponse, next: NextFunction) => {
		res.create = (data: any) => {
			res.send({
				success: res.statusCode === 200 ? true : false,
				payload: data,
			});
		};
		next();
	});

export default upgradeResponse;
