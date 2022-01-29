import { Client } from 'pg';
import { logger } from './logger';

export const pgClient = new Client({
	user: process.env.POSTGRES_USER,
	host: process.env.POSTGRES_HOST,
	database: process.env.POSTGRES_DB,
	password: process.env.POSTGRES_PASSWORD,
	port: +process.env.POSTGRES_PORT,
	ssl: true,
});

const postgresConnection = async () => {
	try {
		await pgClient.connect();
		logger.info('Successfully connected to Postgres!');
	} catch (err) {
		logger.error('Something went wrong while connecting to Postgres!', err);
	}
};

export default postgresConnection;
