import { Example } from '@/example/entities/example';
import { BaseExample } from '@/example/entities/types/example.type';
import { ExampleRepository } from '@/example/repositories/example.repository';

export class ExampleDatabase implements ExampleRepository {
    async save(data: Example): Promise<BaseExample> {
        throw new Error('Method not implemented.');
    }

    async getOne(identifier: string): Promise<BaseExample | null> {
        throw new Error('Method not implemented.');
    }
}
