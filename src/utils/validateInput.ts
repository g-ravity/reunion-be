import { SchemaOf, ValidationError } from 'yup';
import { BadRequestError } from './errors';
import { logger } from './logger';

export const validateInput = <TSchema>(validationSchema: SchemaOf<TSchema>, data: Record<string, unknown>): void => {
	try {
		validationSchema.validateSync(data, { abortEarly: false });
	} catch (error) {
		logger.error({ error });

		if (error instanceof ValidationError) {
			const errors = error.inner.reduce((acc: Record<string, string>, curr) => {
				acc[curr.path] = curr.message;
				return acc;
			}, {});

			throw new BadRequestError({ message: 'Validation Failed!', errors });
		}
	}
};
