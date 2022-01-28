import { NextFunction, Request } from 'express';
import { Express } from 'express-serve-static-core';
import { IResponse } from '../types/General';
import { isNotEmptyObject } from './commonHelpers';

const upgradeResponse = (app: Express) =>
	app.use((req: Request, res: IResponse, next: NextFunction) => {
		res.create = (data: any) => {
			res.send({
				success: isNotEmptyObject(data) ? true : false,
				payload: data,
			});
		};
		next();
	});

export default upgradeResponse;
