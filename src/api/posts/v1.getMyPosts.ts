import { logger } from '../../utils/logger';
import { ICleanUser } from '../../types/User';
import { getMyPostsQuery } from '../../queries/posts.query';

export const getMyPosts = async (userId: ICleanUser['id']) => {
	try {
		const posts = await getMyPostsQuery({ id: userId });
		return posts;
	} catch (err) {
		logger.error('v1.getMyPosts: ', err);
		return null;
	}
};
