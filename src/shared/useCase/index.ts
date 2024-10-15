import { validate } from 'class-validator';

import { InvalidAttributes } from '@/shared/http/errors';

export interface Execute<Input, Output> {
    execute(params: Input): Output;
}

export abstract class UseCase {
    run<Input>(params: Input): Record<string, unknown> | unknown {
        if (process.env.NODE_ENV === 'development') {
            //eslint-disable-next-line no-console
            console.info({ params });
        }
        return this.execute(params);
    }

    execute(
        params: Record<string, unknown> | unknown,
    ): Record<string, unknown> | unknown {
        throw new Error(`Implement the 'execute' method! with: ${params}`);
    }

    protected async validateObject(obj: object) {
        const validationErrors = await validate(obj, {
            validationError: { target: false },
            whitelist: true,
            forbidUnknownValues: true,
            forbidNonWhitelisted: true,
        });
        if (validationErrors.length > 0) {
            throw new InvalidAttributes(validationErrors[0]);
        }
    }
}
