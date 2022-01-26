import { omitWrapper } from './commonHelpers';
import { logger } from './logger';

export const request = async <TResponse>(url: string, config: RequestInit): Promise<{ data: TResponse; status: number }> => {
	try {
		const response = await fetch(url, omitWrapper(config, ['isJSONResponse']));

		const data = (await response.json()) as TResponse;

		return { data: data as TResponse, status: response.status };
	} catch (error) {
		logger.log('Something went wrong. \n', error);
		throw new Error(error as string);
	}
};
