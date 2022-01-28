import { IRawUser } from './User';

export interface IPost {
	id: number;
	userId: number;
	title: string;
	description: string;
	createdAt: string;
}

export type IPostArgs = Pick<IPost, 'title' | 'description' | 'userId'>;

export type IUserPost = {
	id: IPost['id'];
	userId: IRawUser['id'];
};
