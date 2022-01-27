import { Request, Response } from 'express';
import { IRawUser } from './User';

export interface IResponse extends Response {
	create: <TData>(data: TData) => void;
}

export interface IRequest extends Request {
	user: IRawUser;
}

export interface ISuccess {
	isSuccess: boolean;
}
