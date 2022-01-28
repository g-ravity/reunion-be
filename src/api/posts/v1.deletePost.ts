import { logger } from '../../utils/logger';
import { ICleanUser } from '../../types/User';
import { IPost } from '../../types/Post';
import * as yup from 'yup';
import { validateInput } from '../../utils/validateInput';
import { deletePostQuery } from '../../queries/posts.query';

export const DeletePostSchema = yup.object({
	id: yup.number().required(),
});

export const deletePost = async (userId: ICleanUser['id'], params: Pick<IPost, 'id'>) => {
	try {
		validateInput(DeletePostSchema, params);

		const data = await deletePostQuery({ ...params, userId });
		return data;
	} catch (err) {
		logger.error('v1.deletePost: ', err);
		return null;
	}
};
