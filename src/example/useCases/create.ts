import { plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

import { CreateExampleDto } from '@/example/dto/create.dto';
import { ResponseExampleDto } from '@/example/dto/response.dto';
import { Example } from '@/example/entities/example';
import { ExampleRepository } from '@/example/repositories/example.repository';
import { Execute, UseCase } from '@/shared/useCase';

@injectable()
export class CreateExample
    extends UseCase
    implements Execute<{ body: CreateExampleDto }, Promise<ResponseExampleDto>>
{
    constructor(
        @inject('ExampleRepository')
        private exampleRepository: ExampleRepository,
    ) {
        super();
    }

    async execute({
        body,
    }: {
        body: CreateExampleDto;
    }): Promise<ResponseExampleDto> {
        const dto = plainToInstance(CreateExampleDto, body);
        await super.validateObject(dto);

        const example = Example.create(dto);
        await this.exampleRepository.save(example);
        return ResponseExampleDto.toPlain(example);
    }
}
