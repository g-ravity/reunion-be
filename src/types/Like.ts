import { IPost } from './Post';
import { ICleanUser } from './User';

export interface ILike {
	id: number;
	postId: IPost['id'];
	userId: ICleanUser['id'];
}

export type ILikeArgs = Pick<ILike, 'postId' | 'userId'>;
