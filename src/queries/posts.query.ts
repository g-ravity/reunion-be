import { logger } from '../utils/logger';
import { pgClient } from '../utils/postgres';
import { IUser } from '../types/User';
import { escape } from 'sqlutils/pg';
import { ISuccess } from '../types/General';
import { IPost, IPostArgs, IUserPost } from '../types/Post';

export const createPostQuery = async ({ title, description, userId }: IPostArgs): Promise<IPost> => {
	try {
		const post = await new Promise<IPost>((resolve, reject) => {
			pgClient.query<IPost>(
				`INSERT INTO posts (title, description, userId)
                VALUES ($1, $2, $3)
                RETURNING posts.id, posts.title, posts.description, posts.createdAt`,
				[escape(title), escape(description), escape(userId)],
				(error, results) => {
					if (error) {
						logger.error('Error in createPost query: ', error);
						reject(error);
					}

					resolve(results.rows[0]);
				},
			);
		});

		return post;
	} catch (err) {
		logger.error('Error in createPost query: ', err);
		return null;
	}
};

export const deletePostQuery = async ({ id, userId }: IUserPost): Promise<ISuccess> => {
	try {
		const data = await new Promise<ISuccess>((resolve, reject) => {
			pgClient.query<ISuccess>(
				'DELETE FROM posts WHERE id = $1 AND userId = $2',
				[escape(id), escape(userId)],
				(error, results) => {
					if (error) {
						logger.error('Error in deletePost query: ', error);
						reject(error);
					}

					resolve({ isSuccess: results.rowCount === 1 });
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
				`SELECT posts.id, posts.title, posts.description, posts.createdAt, users.id as userId, users.username
                FROM posts
                JOIN users ON posts.userId = users.id
                WHERE posts.id = $1`,
				[escape(id)],
				(error, results) => {
					if (error) {
						logger.error('Error in getPost query: ', error);
						reject(error);
					}

					resolve(results.rows[0]);
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
				`SELECT posts.id, posts.title, posts.description, posts.createdAt, users.id as userId, users.username
                FROM posts
                JOIN users ON posts.userId = users.id
                WHERE posts.userId = $1`,
				[escape(id)],
				(error, results) => {
					if (error) {
						logger.error('Error in getMyPosts query: ', error);
						reject(error);
					}

					resolve(results.rows);
				},
			);
		});

		return posts;
	} catch (err) {
		logger.error('Error in getMyPosts query: ', err);
		return null;
	}
};
