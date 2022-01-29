import { logger } from '../utils/logger';
import { pgClient } from '../utils/postgres';
import { IUser } from '../types/User';
import { escape } from 'sqlutils/pg';
import { ISuccess } from '../types/General';
import { IPost, IPostArgs, IUserPost } from '../types/Post';

export const createPostQuery = async ({ title, description, user_id }: IPostArgs): Promise<IPost> => {
	try {
		const post = await new Promise<IPost>((resolve, reject) => {
			pgClient.query<IPost>(
				`INSERT INTO posts (title, description, user_id)
                VALUES (${escape(title)}, ${escape(description)}, ${escape(user_id)})
                RETURNING id, title, description, user_id, created_at`,
				(error, results) => {
					if (error) {
						logger.error('Error in createPost query: ', error);
						reject(error);
					}

					resolve(results?.rows[0]);
				},
			);
		});

		return post;
	} catch (err) {
		logger.error('Error in createPost query: ', err);
		return null;
	}
};

export const deletePostQuery = async ({ id, user_id }: IUserPost): Promise<ISuccess> => {
	try {
		const data = await new Promise<ISuccess>((resolve, reject) => {
			pgClient.query<ISuccess>(
				`DELETE FROM posts WHERE id = ${escape(id)} AND user_id = ${escape(user_id)}`,
				(error, results) => {
					if (error) {
						logger.error('Error in deletePost query: ', error);
						reject(error);
					}

					if (results?.rowCount === 1) resolve({ isSuccess: true });
					else reject('No post found');
				},
			);
		});

		return data;
	} catch (err) {
		logger.error('Error in deletePost query: ', err);
		return null;
	}
};

export const getPostQuery = async ({ id }: Pick<IPost, 'id'>): Promise<IPost> => {
	try {
		const post = await new Promise<IPost>((resolve, reject) => {
			pgClient.query<IPost>(
				`SELECT post_comments.id, post_comments.title, post_comments.description, post_comments.created_at, post_comments.likes_count, post_comments.comments, users.id as user_id, users.username
				FROM users
				JOIN 
				(SELECT posts.id, posts.title, posts.description, posts.created_at, posts.user_id,
				CAST ((SELECT COUNT(*) FROM likes WHERE likes.post_id = id) AS INTEGER) as likes_count,
				COALESCE(JSON_AGG(JSON_BUILD_OBJECT('comment_id', comments.id, 'comment' , comments.comment)) FILTER (WHERE comments.id IS NOT NULL), '[]') as comments
				FROM posts
				LEFT JOIN comments on comments.post_id = posts.id
				WHERE posts.id = ${escape(id)}
				GROUP BY posts.id) as post_comments ON users.id = post_comments.user_id`,
				(error, results) => {
					if (error) {
						logger.error('Error in getPost query: ', error);
						reject(error);
					}

					resolve(results?.rows[0]);
				},
			);
		});

		return post;
	} catch (err) {
		logger.error('Error in getPost query: ', err);
		return null;
	}
};

export const getMyPostsQuery = async ({ id }: Pick<IUser, 'id'>): Promise<IPost[]> => {
	try {
		const posts = await new Promise<IPost[]>((resolve, reject) => {
			pgClient.query<IPost>(
				`SELECT post_comments.id, post_comments.title, post_comments.description, post_comments.created_at, post_comments.likes_count, post_comments.comments, users.id as user_id, users.username
				FROM users
				JOIN 
				(SELECT posts.id, posts.title, posts.description, posts.created_at, posts.user_id,
				CAST ((SELECT COUNT(*) FROM likes WHERE likes.post_id = id) AS INTEGER) as likes_count,
				COALESCE(JSON_AGG(JSON_BUILD_OBJECT('comment_id', comments.id, 'comment' , comments.comment)) FILTER (WHERE comments.id IS NOT NULL), '[]') as comments
				FROM posts
				LEFT JOIN comments on comments.post_id = posts.id
				WHERE posts.user_id = ${escape(id)}
				GROUP BY posts.id) as post_comments ON users.id = post_comments.user_id`,
				(error, results) => {
					if (error) {
						logger.error('Error in getMyPosts query: ', error);
						reject(error);
					}

					resolve(results?.rows);
				},
			);
		});

		return posts;
	} catch (err) {
		logger.error('Error in getMyPosts query: ', err);
		return null;
	}
};
