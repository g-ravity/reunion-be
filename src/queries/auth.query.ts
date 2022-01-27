import { logger } from '../utils/logger';
import { pgClient } from '../utils/postgres';
import brcypt from 'bcryptjs';
import { ILoginParams } from '../api/auth/v1.login';
import { IRawUser, IUser } from '../types/User';
import jwt from 'jsonwebtoken';
import {escape} from 'sqlutils';

interface IAuthToken {
    authToken: string;
}

export const loginQuery = async ({email, password}: ILoginParams): Promise<IAuthToken> => {
    try{
        const salt = await brcypt.genSalt();
        const hash = await brcypt.hash(escape(password), salt);

        const loggedInUser = await new Promise<IAuthToken>((resolve, reject) => {
            pgClient.query<Pick<IRawUser, 'id' | 'username'>>(
                `SELECT id, username FROM users
                WHERE email = $1 AND password = $2
                LIMIT 1`,
                [escape(email), escape(hash)],
                (error, results) => {
                    if (error) {
                        logger.error('Error in login query: ', error);
                        reject(error);
                    }

                    if(results.rowCount === 0){
                        logger.error('No user found with given credentials');
                        reject(new Error('No user found with given credentials'));
                    }

                    const authToken = jwt.sign({id: results?.rows[0]}, process.env.JWT_SECRET, {expiresIn: '1d'});
    
                    resolve({authToken});
                },
            );
        });
    
        return loggedInUser;
    } catch(err){
        logger.error('Error in login query: ', err);
        return null;
    }
};
