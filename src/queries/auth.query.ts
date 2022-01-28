import { logger } from '../utils/logger';
import { pgClient } from '../utils/postgres';
import { ICleanUser, IRawUser } from '../types/User';
import { escape } from 'sqlutils/pg';

export const loginQuery = async ({ email }: Pick<ICleanUser, 'email'>): Promise<IRawUser> => {
	try {
		const user = await new Promise<IRawUser>((resolve, reject) => {
			pgClient.query<IRawUser>(
				`SELECT * FROM users
                WHERE email = ${escape(email)}
                LIMIT 1`,
				(error, results) => {
					if (error) {
						logger.error('Error in login query: ', error);
						reject(error);
					}

					if (results?.rowCount === 0) {
						logger.error('No user found with given email');
						reject(new Error('No user found with given email'));
					}

					resolve(results?.rows[0]);
				},
			);
		});

		return user;
	} catch (err) {
		logger.error('Error in login query: ', err);
		throw new Error(err);
	}
};
