import { IUserPost } from './Post';

export interface ILike extends IUserPost {
	id: number;
}

export type ILikeArgs = Pick<ILike, 'post_id' | 'user_id'>;
