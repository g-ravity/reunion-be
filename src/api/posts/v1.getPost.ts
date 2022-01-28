import { logger } from '../../utils/logger';
import { IPost } from '../../types/Post';
import * as yup from 'yup';
import { validateInput } from '../../utils/validateInput';
import { getPostQuery } from '../../queries/posts.query';

export const GetPostSchema = yup.object({
	id: yup.number().required(),
});

export const getPost = async (params: Pick<IPost, 'id'>) => {
	try {
		validateInput(GetPostSchema, params);

		const post = await getPostQuery(params);
		return post;
	} catch (err) {
		logger.error('v1.getPost: ', err);
		return null;
	}
};
