import { logger } from '../../utils/logger';
import { ICleanUser } from '../../types/User';
import * as yup from 'yup';
import { validateInput } from '../../utils/validateInput';
import { IComment } from '../../types/Comment';
import { createCommentQuery } from '../../queries/comments.query';

export const AddCommentSchema = yup.object({
	comment: yup.string().required(),
	post_id: yup.number().required(),
});

export const addComment = async (user_id: ICleanUser['id'], params: Pick<IComment, 'comment' | 'post_id'>) => {
	try {
		validateInput(AddCommentSchema, params);

		const comment = await createCommentQuery({ ...params, user_id });
		return comment;
	} catch (err) {
		logger.error('v1.addComment: ', err);
		return null;
	}
};
