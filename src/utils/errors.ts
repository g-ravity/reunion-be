/* eslint-disable max-classes-per-file */

export class BadRequestError extends Error {
	statusCode: number;

	errors: Record<string, unknown>;

	constructor({ message = '', errors = null }: { message: string; errors: Record<string, unknown> }) {
		super();
		this.statusCode = 400;
		this.errors = errors;
		this.message = message || 'Bad Request';
	}
}

export class NoDataError extends Error {
	statusCode: number;

	constructor({ message = '' }: { message: string }) {
		super();
		this.statusCode = 204;
		this.message = message || 'No Data';
	}
}

export class UnauthorizedError extends Error {
	statusCode: number;

	constructor({ message = '' }: { message: string }) {
		super();
		this.statusCode = 401;
		this.message = message || 'Unauthorized Error ';
	}
}

export class ForbiddenError extends Error {
	statusCode: number;

	constructor({ message = '' }: { message: string }) {
		super();
		this.statusCode = 403;
		this.message = message || 'Forbidden';
	}
}

export class InternalServerError extends Error {
	statusCode: number;

	constructor({ message = '' }: { message: string }) {
		super();
		this.statusCode = 500;
		this.message = message || 'Internal Server Error';
	}
}
