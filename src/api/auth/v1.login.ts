import { logger } from '../../utils/logger';
import { validateInput } from '../../utils/validateInput';
import * as yup from 'yup';
import { loginQuery } from '../../queries/auth.query';
import { IRawUser } from '../../types/User';

export type ILoginParams = {
	email: IRawUser['email'];
	password: string;
};

export const LoginSchema = yup.object({
	email: yup.string().required(),
	password: yup.string().required(),
});

export const loginUser = async (params: ILoginParams) => {
	try {
		validateInput(LoginSchema, params);

		const authData = await loginQuery(params);
		return authData;
	} catch (err) {
		logger.error('v1.login: ', err);
		return null;
	}
};
