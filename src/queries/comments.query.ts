import { logger } from '../utils/logger';
import { pgClient } from '../utils/postgres';
import { escape } from 'sqlutils/pg';
import { IRawComment, ICommentArgs } from '../types/Comment';

export const createCommentQuery = async ({ post_id, user_id, comment }: ICommentArgs): Promise<IRawComment> => {
	try {
		const commentData = await new Promise<IRawComment>((resolve, reject) => {
			pgClient.query<IRawComment>(
				`INSERT INTO comments (post_id, user_id, comment)
                VALUES (${escape(post_id)}, ${escape(user_id)}, ${escape(comment)})
                RETURNING id, post_id, user_id, comment`,
				(error, results) => {
					if (error) {
						logger.error('Error in createComment query: ', error);
						reject(error);
					}

					resolve(results?.rows[0]);
				},
			);
		});

		return commentData;
	} catch (err) {
		logger.error('Error in createComment query: ', err);
		return null;
	}
};
