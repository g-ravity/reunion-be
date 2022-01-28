import { IPost } from './Post';
import { IRawUser } from './User';

export interface ILike {
	id: number;
	postId: IPost['id'];
	userId: IRawUser['id'];
}

export type ILikeArgs = Pick<ILike, 'postId' | 'userId'>;
