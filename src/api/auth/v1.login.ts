import { logger } from '../../utils/logger';
import { validateInput } from '../../utils/validateInput';
import * as yup from 'yup';
import { loginQuery } from '../../queries/auth.query';
import { ICleanUser } from '../../types/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { omitWrapper } from '../../utils/commonHelpers';

export type ILoginParams = {
	email: ICleanUser['email'];
	password: string;
};

export const LoginSchema = yup.object({
	email: yup.string().required(),
	password: yup.string().required(),
});

export const loginUser = async (params: ILoginParams) => {
	try {
		validateInput(LoginSchema, params);

		const userData = await loginQuery({ email: params.email });

		const isMatch = await bcrypt.compare(params.password, userData.password);
		if (isMatch) {
			const authToken = jwt.sign(omitWrapper(userData, ['password', 'email']), process.env.JWT_SECRET, {
				expiresIn: '1d',
			});

			return { authToken };
		} else {
			logger.error('Wrong Password');
			throw new Error('Wrong Password');
		}
	} catch (err) {
		logger.error('v1.login: ', err);
		return err;
	}
};
