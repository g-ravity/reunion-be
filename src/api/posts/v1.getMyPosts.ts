import { logger } from '../../utils/logger';
import { IRawUser } from '../../types/User';
import { getMyPostsQuery } from '../../queries/posts.query';

export const getMyPosts = async (userId: IRawUser['id']) => {
	try {
		const posts = await getMyPostsQuery({ id: userId });
		return posts;
	} catch (err) {
		logger.error('v1.getMyPosts: ', err);
		return null;
	}
};
