import { logger } from '../utils/logger';
import { pgClient } from '../utils/postgres';
import { escape } from 'sqlutils/pg';
import { ISuccess } from '../types/General';
import { ILike, ILikeArgs } from '../types/Like';

export const likePostQuery = async ({ userId, postId }: ILikeArgs): Promise<ILike> => {
	try {
		const likeData = await new Promise<ILike>((resolve, reject) => {
			pgClient.query<ILike>(
				`INSERT INTO likes (userId, postId)
                VALUES ($1, $2)
                RETURNING inserted.id, inserted.userId, inserted.postId`,
				[escape(userId), escape(postId)],
				(error, results) => {
					if (error) {
						logger.error('Error in addLike query: ', error);
						reject(error);
					}

					resolve(results.rows[0]);
				},
			);
		});

		return likeData;
	} catch (err) {
		logger.error('Error in addLike query: ', err);
		return null;
	}
};

export const unlikePostQuery = async ({ userId, postId }: ILikeArgs): Promise<ISuccess> => {
	try {
		const data = await new Promise<ISuccess>((resolve, reject) => {
			pgClient.query<ISuccess>(
				`DELETE FROM likes
        WHERE userId = $1 AND postId = $2`,
				[escape(userId), escape(postId)],
				(error, results) => {
					if (error) {
						logger.error('Error in removeLike query: ', error);
						reject(error);
					}

					resolve({ isSuccess: true });
				},
			);
		});

		return data;
	} catch (err) {
		logger.error('Error in removeLike query: ', err);
		return null;
	}
};
