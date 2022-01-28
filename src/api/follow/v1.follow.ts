import { logger } from '../../utils/logger';
import { ICleanUser } from '../../types/User';
import { followUserQuery } from '../../queries/follow.query';

export const followUser = async (userId: ICleanUser['id'], following_id: ICleanUser['id']) => {
	try {
		const followshipData = await followUserQuery({ follower_id: userId, following_id });
		return followshipData;
	} catch (err) {
		logger.error('v1.followUser: ', err);
		return null;
	}
};
