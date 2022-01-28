import { logger } from '../../utils/logger';
import { IRawUser } from '../../types/User';
import { likePostQuery } from '../../queries/likes.query';
import { IPost } from '../../types/Post';

export const likePost = async (userId: IRawUser['id'], postId: IPost['id']) => {
	try {
		const likeData = await likePostQuery({ userId, postId });
		return likeData;
	} catch (err) {
		logger.error('v1.likePost: ', err);
		return null;
	}
};
