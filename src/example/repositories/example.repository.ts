import { Example } from '@/example/entities/example';
import { BaseExample } from '@/example/entities/types/example.type';

export interface ExampleRepository {
    save(data: Example): Promise<BaseExample>;

    getOne(identifier: string): Promise<BaseExample | null>;
}
