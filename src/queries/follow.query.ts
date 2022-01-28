import { logger } from '../utils/logger';
import { pgClient } from '../utils/postgres';
import { ICleanUser, IUser, IUserDetails } from '../types/User';
import { escape } from 'sqlutils/pg';
import { IFollow, IFollowArgs } from '../types/Follow';
import { ISuccess } from '../types/General';

export const getFollowDetailsQuery = async ({ id, username }: ICleanUser): Promise<IUserDetails> => {
	try {
		const userData = await new Promise<IUserDetails>((resolve, reject) => {
			pgClient.query<Pick<IUser, 'followers_count' | 'following_count'>>(
				`SELECT 
                CAST((SELECT COUNT(id) as count FROM follow WHERE following_id = ${escape(
					id,
				)}) AS INTEGER) as followers_count,
                CAST((SELECT COUNT(id) as count FROM follow WHERE follower_id = ${escape(
					id,
				)}) AS INTEGER) as following_count`,
				(error, results) => {
					if (error) {
						logger.error('Error in getFollowDetails query: ', error);
						reject(error);
					}

					resolve({ id, username, ...results?.rows[0] });
				},
			);
		});

		return userData;
	} catch (err) {
		logger.error('Error in getFollowDetails query: ', err);
		return err;
	}
};

export const followUserQuery = async ({ follower_id, following_id }: IFollowArgs): Promise<IFollow> => {
	try {
		const followshipData = await new Promise<IFollow>((resolve, reject) => {
			pgClient.query<IFollow>(
				`INSERT INTO follow (follower_id, following_id)
				VALUES (${escape(follower_id)}, ${escape(following_id)})
                RETURNING inserted.id, inserted.follower_id, inserted.following_id`,
				(error, results) => {
					if (error) {
						logger.error('Error in followUser query: ', error);
						reject(error);
					}

					resolve(results?.rows[0]);
				},
			);
		});

		return followshipData;
	} catch (err) {
		logger.error('Error in followUser query: ', err);
		return err;
	}
};

export const unfollowUserQuery = async ({ follower_id, following_id }: IFollowArgs): Promise<ISuccess> => {
	try {
		const data = await new Promise<ISuccess>((resolve, reject) => {
			pgClient.query<ISuccess>(
				`DELETE FROM follow
            WHERE follower_id = ${escape(follower_id)} AND following_id = ${escape(following_id)}`,
				(error, results) => {
					if (error) {
						logger.error('Error in unfollowUser query: ', error);
						reject(error);
					}

					// TODO: Check if this is the correct way to return success
					console.log(results);

					resolve({ isSuccess: true });
				},
			);
		});

		return data;
	} catch (err) {
		logger.error('Error in unfollowUser query: ', err);
		return err;
	}
};
