import { logger } from '../utils/logger';
import { pgClient } from '../utils/postgres';
import { IRawUser, IUser } from '../types/User';
import {escape} from 'sqlutils/pg'
import { IFollow } from '../types/Follow';
import { ISuccess } from '../types/General';

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

export const followUserQuery = async ({followerId, followingId}: Pick<IFollow, 'followerId'| 'followingId'>): Promise<IFollow> => {
        try{
        const followshipData = await new Promise<IFollow>((resolve, reject) => {
            pgClient.query<IFollow>(
                `INSERT INTO follow (followerId, followingId)
                OUTPUT inserted.id, inserted.followerId, inserted.followingId
                VALUES ($1, $2)`,
                [escape(followerId), escape(followingId)],
                (error, results) => {
                    if (error) {
                        logger.error('Error in follow user query: ', error);
                        reject(error);
                    }
    
                    resolve(results.rows[0]);
                },
            );
        });
    
        return followshipData;
    } catch(err){
        logger.error('Error in getFollowDetails query: ', err);
        return null;
    }
}   
export const unfollowUserQuery = async ({followerId, followingId}: Pick<IFollow, 'followerId'| 'followingId'>): Promise<ISuccess> => {
   try{
        const data = await new Promise<ISuccess>((resolve, reject) => {
        pgClient.query<ISuccess>(
            `DELETE FROM follow
            WHERE followerId = $1 AND followingId = $2`,
            [escape(followerId), escape(followingId)],
            (error, results) => {
                if (error) {
                    logger.error('Error in unfollow user query: ', error);
                    reject(error);
                }
    
                resolve({isSuccess: true});
            },
        );
    });

    return data;
    } catch(err){
        logger.error('Error in getFollowDetails query: ', err);
        return null;
    }
}