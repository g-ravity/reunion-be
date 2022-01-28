import { logger } from '../../utils/logger';
import { ICleanUser } from '../../types/User';
import { unfollowUserQuery } from '../../queries/follow.query';

export const unfollowUser = async (userId: ICleanUser['id'], following_id: ICleanUser['id']) => {
	try {
		const data = await unfollowUserQuery({ follower_id: userId, following_id });
		return data;
	} catch (err) {
		logger.error('v1.unfollowUser: ', err);
		return null;
	}
};
