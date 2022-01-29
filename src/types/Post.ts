import { ICleanUser } from './User';

export interface IPost {
	id: number;
	user_id: number;
	title: string;
	description: string;
	created_at: string;
}

export type IPostArgs = Pick<IPost, 'title' | 'description' | 'user_id'>;

export type IUserPost = {
	id: IPost['id'];
	user_id: ICleanUser['id'];
};
