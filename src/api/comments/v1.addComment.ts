import { logger } from '../../utils/logger';
import { IRawUser } from '../../types/User';
import * as yup from 'yup';
import { validateInput } from '../../utils/validateInput';
import { IComment } from '../../types/Comment';
import { createCommentQuery } from '../../queries/comments.query';

export const AddCommentSchema = yup.object({
	comment: yup.string().required(),
	postId: yup.number().required(),
});

export const addComment = async (userId: IRawUser['id'], params: Pick<IComment, 'comment' | 'postId'>) => {
	try {
		validateInput(AddCommentSchema, params);

		const comment = await createCommentQuery({ ...params, userId });
		return comment;
	} catch (err) {
		logger.error('v1.addComment: ', err);
		return null;
	}
};
