import { logger } from '../../utils/logger';
import { ICleanUser } from '../../types/User';
import { getFollowDetailsQuery } from '../../queries/follow.query';

export const getUserDetails = async (params: ICleanUser) => {
	try {
		const userData = await getFollowDetailsQuery(params);
		return userData;
	} catch (err) {
		logger.error('v1.getUser: ', err);
		return null;
	}
};
