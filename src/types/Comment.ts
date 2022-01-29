import { IUserPost } from './Post';

export interface IRawComment extends IUserPost {
	id: number;
	comment: string;
}

export interface ICleanComment {
	comment_id: IRawComment['id'];
	comment: IRawComment['comment'];
}

export type ICommentArgs = Pick<IRawComment, 'comment' | 'post_id' | 'user_id'>;
