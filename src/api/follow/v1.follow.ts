import { logger } from '../../utils/logger';
import { ICleanUser } from '../../types/User';
import { followUserQuery } from '../../queries/follow.query';

export const followUser = async (userId: ICleanUser['id'], followingId: ICleanUser['id']) => {
	try {
		const followshipData = await followUserQuery({ followerId: userId, followingId });
		return followshipData;
	} catch (err) {
		logger.error('v1.followUser: ', err);
		return null;
	}
};
