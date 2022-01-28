import { logger } from '../../utils/logger';
import { IRawUser } from '../../types/User';
import { unlikePostQuery } from '../../queries/likes.query';
import { IPost } from '../../types/Post';

export const unlikePost = async (userId: IRawUser['id'], postId: IPost['id']) => {
	try {
		const likeData = await unlikePostQuery({ userId, postId });
		return likeData;
	} catch (err) {
		logger.error('v1.unlikePost: ', err);
		return null;
	}
};
