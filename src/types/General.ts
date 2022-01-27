import { Response } from 'express';

export interface IResponse extends Response {
	create: <TData>(data: TData) => void;
}
