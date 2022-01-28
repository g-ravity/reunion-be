import { Request, Response } from 'express';
import { ICleanUser } from './User';

export interface IResponse extends Response {
	create: <TData>(data: TData) => void;
}

export interface IRequest extends Request {
	user: ICleanUser;
}

export interface ISuccess {
	isSuccess: boolean;
}
