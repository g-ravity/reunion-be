import { logger } from '../../utils/logger';
import { ICleanUser } from '../../types/User';
import { unlikePostQuery } from '../../queries/likes.query';
import { IPost } from '../../types/Post';

export const unlikePost = async (user_id: ICleanUser['id'], post_id: IPost['id']) => {
	try {
		const data = await unlikePostQuery({ user_id, post_id });
		return data;
	} catch (err) {
		logger.error('v1.unlikePost: ', err);
		return null;
	}
};
