import { logger } from '../../utils/logger';
import { ICleanUser } from '../../types/User';
import { likePostQuery } from '../../queries/likes.query';
import { IPost } from '../../types/Post';

export const likePost = async (user_id: ICleanUser['id'], post_id: IPost['id']) => {
	try {
		const likeData = await likePostQuery({ user_id, post_id });
		return likeData;
	} catch (err) {
		logger.error('v1.likePost: ', err);
		return null;
	}
};
