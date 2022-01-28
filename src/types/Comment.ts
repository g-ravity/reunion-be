import { IPost } from './Post';
import { ICleanUser } from './User';

export interface IComment {
	id: number;
	comment: string;
	postId: IPost['id'];
	userId: ICleanUser['id'];
}

export type ICommentArgs = Pick<IComment, 'comment' | 'postId' | 'userId'>;
