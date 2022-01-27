import { logger } from '../../utils/logger';
import { IRawUser } from '../../types/User';
import { followUserQuery } from '../../queries/follow.query';

export const followUser = async (userId:IRawUser['id'], followingId: IRawUser['id']) => {
	try {
        const followshipData = await followUserQuery({followerId: userId, followingId});
        return followshipData;
	} catch (err) {
		logger.error('v1.followUser: ', err);
		return null;
	}
};
