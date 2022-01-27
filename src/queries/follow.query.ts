import { logger } from '../utils/logger';
import { pgClient } from '../utils/postgres';
import { IRawUser, IUser } from '../types/User';
import {escape} from 'sqlutils/pg'

export const getFollowDetailsQuery = async ({id, username}: IRawUser): Promise<IUser> => {
    try{
        const userData = await new Promise<IUser>((resolve, reject) => {
            pgClient.query<Pick<IUser, 'followersCount' | 'followingCount'>>(
                `SELECT 
                (SELECT COUNT(id) as count FROM follow WHERE followingId = $1) as followersCount,
                (SELECT COUNT(id) as count FROM follow WHERE followerId = $1) as followingCount`,
                [escape(id)],
                (error, results) => {
                    if (error) {
                        logger.error('Error in user follow details query: ', error);
                        reject(error);
                    }
    
                    resolve({id, username, ...results.rows[0]});
                },
            );
        });
    
        return userData;
    } catch(err){
        logger.error('Error in getFollowDetails query: ', err);
        return null;
    }
};
