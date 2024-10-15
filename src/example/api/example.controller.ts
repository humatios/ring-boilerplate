import { Body, Get, Path, Post, Route } from '@tsoa/runtime';

import { Container } from '@/Container';
import { CreateExampleDto } from '@/example/dto/create.dto';
import { ResponseExampleDto } from '@/example/dto/response.dto';
import { CreateExample } from '@/example/useCases/create';
import { GetOneExample } from '@/example/useCases/getOne';

@Route('/v1/example/')
export class ExampleController {
    @Post()
    static async create(
        @Body() body: CreateExampleDto,
    ): Promise<ResponseExampleDto> {
        return Container.resolve(CreateExample).run({
            body,
        }) as ResponseExampleDto;
    }

    @Get('{identifier}')
    static async getOne(
        @Path() identifier: string,
    ): Promise<ResponseExampleDto> {
        return Container.resolve(GetOneExample).run({
            identifier,
        }) as ResponseExampleDto;
    }
}
