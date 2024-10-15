import { Expose, instanceToPlain, plainToInstance } from 'class-transformer';

import { ResponseExample } from '@/example/entities/types/example.type';

import { Example } from '../entities/example';

export class ResponseExampleDto implements ResponseExample {
    /**
     * Example message
     */
    @Expose()
    identifier: string;

    /**
     * Example message
     */
    @Expose()
    message: string;

    /**
     * Is the message available.
     */
    @Expose()
    available: boolean;

    /**
     * Creation date.
     */
    @Expose()
    createDate: string;

    /**
     * Last modified date.
     */
    @Expose()
    modifyDate: string;

    static toPlain(example: Example) {
        return plainToInstance(ResponseExampleDto, instanceToPlain(example), {
            excludeExtraneousValues: true,
        });
    }
}
