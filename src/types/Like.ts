import { IPost } from './Post';
import { ICleanUser } from './User';

export interface ILike {
	id: number;
	post_id: IPost['id'];
	user_id: ICleanUser['id'];
}

export type ILikeArgs = Pick<ILike, 'post_id' | 'user_id'>;
