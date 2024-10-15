import {
    IsBoolean,
    IsDefined,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

import { CreateExample } from '@/example/entities/types/example.type';

export class CreateExampleDto implements CreateExample {
    /**
     * Example message
     */
    @IsString()
    @IsDefined()
    message: string;

    /**
     * Position of the message.
     */
    @IsNumber()
    @IsOptional()
    position?: number;

    /**
     * Is the message available.
     */
    @IsBoolean()
    @IsOptional()
    available?: boolean;
}
