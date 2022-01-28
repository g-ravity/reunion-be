import { IPost } from './Post';
import { IRawUser } from './User';

export interface IComment {
	id: number;
	comment: string;
	postId: IPost['id'];
	userId: IRawUser['id'];
}

export type ICommentArgs = Pick<IComment, 'comment' | 'postId' | 'userId'>;
