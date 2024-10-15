import { inject, injectable } from 'tsyringe';

import { ResponseExampleDto } from '@/example/dto/response.dto';
import { Example } from '@/example/entities/example';
import { ExampleRepository } from '@/example/repositories/example.repository';
import { NotFoundError } from '@/shared/http/errors';
import { Execute, UseCase } from '@/shared/useCase';

@injectable()
export class GetOneExample
    extends UseCase
    implements Execute<{ identifier: string }, Promise<ResponseExampleDto>>
{
    constructor(
        @inject('ExampleRepository')
        private exampleRepository: ExampleRepository,
    ) {
        super();
    }

    async execute({
        identifier,
    }: {
        identifier: string;
    }): Promise<ResponseExampleDto> {
        const data = await this.exampleRepository.getOne(identifier);
        if (!data) throw new NotFoundError({ message: 'Example not found' });

        return ResponseExampleDto.toPlain(new Example(data));
    }
}
