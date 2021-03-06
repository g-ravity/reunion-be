import { logger } from '../../utils/logger';
import { ICleanUser } from '../../types/User';
import { IUserPost } from '../../types/Post';
import * as yup from 'yup';
import { validateInput } from '../../utils/validateInput';
import { deletePostQuery } from '../../queries/posts.query';

export const DeletePostSchema = yup.object({
	post_id: yup.number().required(),
});

export const deletePost = async (user_id: ICleanUser['id'], params: Pick<IUserPost, 'post_id'>) => {
	try {
		validateInput(DeletePostSchema, params);

		const data = await deletePostQuery({ ...params, user_id });
		return data;
	} catch (err) {
		logger.error('v1.deletePost: ', err);
		return null;
	}
};
