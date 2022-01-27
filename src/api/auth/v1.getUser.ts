import { logger } from '../../utils/logger';
import { IRawUser } from '../../types/User';
import { getFollowDetailsQuery } from '../../queries/follow.query';

export const getUserDetails = async (params: IRawUser) => {
	try {
        const userData = await getFollowDetailsQuery(params);
        return userData;
	} catch (err) {
		logger.error('v1.getUser: ', err);
		return null;
	}
};
