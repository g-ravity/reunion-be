import { logger } from '../utils/logger';
import { pgClient } from '../utils/postgres';
import { escape } from 'sqlutils/pg';
import { IComment, ICommentArgs } from '../types/Comment';

export const createCommentQuery = async ({ postId, userId, comment }: ICommentArgs): Promise<IComment> => {
	try {
		const commentData = await new Promise<IComment>((resolve, reject) => {
			pgClient.query<IComment>(
				`INSERT INTO comments (postId, userId, content)
                VALUES ($1, $2, $3)
                RETURNING comments.id, comments.postId, comments.userId, comments.comment`,
				[escape(postId), escape(userId), escape(comment)],
				(error, results) => {
					if (error) {
						logger.error('Error in createComment query: ', error);
						reject(error);
					}

					resolve(results.rows[0]);
				},
			);
		});

		return commentData;
	} catch (err) {
		logger.error('Error in createComment query: ', err);
		return null;
	}
};
