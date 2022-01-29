import { IPost } from './Post';
import { ICleanUser } from './User';

export interface IComment {
	id: number;
	comment: string;
	post_id: IPost['id'];
	user_id: ICleanUser['id'];
}

export type ICommentArgs = Pick<IComment, 'comment' | 'post_id' | 'user_id'>;
