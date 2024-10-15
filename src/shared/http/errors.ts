import { ValidationError } from 'class-validator';

const CLIENT_ERROR_CODE = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

const DICTIONARY_CODE = {
    BAD_REQUEST: 'BAD_REQUEST',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    NOT_FOUND: 'NOT_FOUND',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    INVALID_ATTRIBUTES: 'INVALID_ATTRIBUTES',
};

interface BaseErrorOptions {
    code: string;
    message: string;
    details?: unknown;
}

export interface ErrorDto extends BaseErrorOptions {
    date: string;
}

class BaseError extends Error {
    code: string;
    date: string;
    details?: unknown;

    constructor(options: BaseErrorOptions) {
        super(options.message);
        this.code = options.code;
        this.details = options.details;
        this.date = new Date().toISOString();
    }

    toJSON(): ErrorDto {
        return {
            code: this.code,
            details: this.details,
            date: this.date,
            message: this.message,
        };
    }
}

export class HttpError extends BaseError {
    httpCode: number;

    constructor(httpCode: number, options: BaseErrorOptions) {
        super(options);
        this.httpCode = httpCode;
    }

    static toHTTPResponse(error: unknown): {
        statusCode: number;
        body: string;
    } {
        if (process.env.NODE_ENV === 'development') {
            //eslint-disable-next-line no-console
            console.error((error as { stack: unknown }).stack);
        }

        if (error instanceof BaseError) {
            return {
                statusCode:
                    (error as HttpError)?.httpCode ??
                    CLIENT_ERROR_CODE.INTERNAL_SERVER_ERROR,
                body: JSON.stringify((error as BaseError)?.toJSON()),
            };
        }
        return {
            statusCode: CLIENT_ERROR_CODE.INTERNAL_SERVER_ERROR,
            body: JSON.stringify({
                code: DICTIONARY_CODE.INTERNAL_SERVER_ERROR,
                date: new Date().toISOString(),
                message: (error as Error).toString(),
            }),
        };
    }
}

export class ServerError extends HttpError {
    constructor(details: string) {
        super(CLIENT_ERROR_CODE.INTERNAL_SERVER_ERROR, {
            code: DICTIONARY_CODE.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error.',
            details,
        });
    }
}

export class NotFoundError extends HttpError {
    constructor({ message, details }: { message: string; details?: unknown }) {
        super(CLIENT_ERROR_CODE.NOT_FOUND, {
            code: DICTIONARY_CODE.NOT_FOUND,
            message,
            details,
        });
    }
}

export class BadRequestError extends HttpError {
    constructor({ message, details }: { message: string; details?: unknown }) {
        super(CLIENT_ERROR_CODE.BAD_REQUEST, {
            code: DICTIONARY_CODE.BAD_REQUEST,
            message,
            details,
        });
    }
}

export class InvalidAttributes extends BadRequestError {
    constructor(details: ValidationError) {
        super({ message: details.toString(), details });
        this.code = DICTIONARY_CODE.INVALID_ATTRIBUTES;
    }
}
