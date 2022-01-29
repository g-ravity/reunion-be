import { logger } from '../../utils/logger';
import { ICleanUser } from '../../types/User';
import { IPostArgs } from '../../types/Post';
import * as yup from 'yup';
import { validateInput } from '../../utils/validateInput';
import { createPostQuery } from '../../queries/posts.query';

export const CreatePostSchema = yup.object({
	title: yup.string().required(),
	description: yup.string().required(),
});

export const createPost = async (user_id: ICleanUser['id'], params: Omit<IPostArgs, 'user_id'>) => {
	try {
		validateInput(CreatePostSchema, params);

		const post = await createPostQuery({ ...params, user_id });
		return post;
	} catch (err) {
		logger.error('v1.createPost: ', err);
		return null;
	}
};
