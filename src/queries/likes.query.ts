import { logger } from '../utils/logger';
import { pgClient } from '../utils/postgres';
import { escape } from 'sqlutils/pg';
import { ISuccess } from '../types/General';
import { ILike, ILikeArgs } from '../types/Like';

export const likePostQuery = async ({ user_id, post_id }: ILikeArgs): Promise<ILike> => {
	try {
		const likeData = await new Promise<ILike>((resolve, reject) => {
			pgClient.query<ILike>(
				`INSERT INTO likes (user_id, post_id)
                VALUES (${escape(user_id)}, ${escape(post_id)})
                RETURNING id, user_id, post_id`,
				(error, results) => {
					if (error) {
						logger.error('Error in likePost query: ', error);
						reject(error);
					}

					resolve(results?.rows[0]);
				},
			);
		});

		return likeData;
	} catch (err) {
		logger.error('Error in likePost query: ', err);
		return null;
	}
};

export const unlikePostQuery = async ({ user_id, post_id }: ILikeArgs): Promise<ISuccess> => {
	try {
		const data = await new Promise<ISuccess>((resolve, reject) => {
			pgClient.query<ISuccess>(
				`DELETE FROM likes
        WHERE user_id = ${escape(user_id)} AND post_id = ${escape(post_id)}`,
				(error, results) => {
					if (error) {
						logger.error('Error in unlikePost query: ', error);
						reject(error);
					}
					if (results?.rowCount === 1) resolve({ isSuccess: true });
					else reject('No post like found');
				},
			);
		});

		return data;
	} catch (err) {
		logger.error('Error in unlikePost query: ', err);
		return null;
	}
};
