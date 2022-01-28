import { logger } from '../../utils/logger';
import { ICleanUser } from '../../types/User';
import { unfollowUserQuery } from '../../queries/follow.query';

export const unfollowUser = async (userId: ICleanUser['id'], followingId: ICleanUser['id']) => {
	try {
		const data = await unfollowUserQuery({ followerId: userId, followingId });
		return data;
	} catch (err) {
		logger.error('v1.unfollowUser: ', err);
		return null;
	}
};
