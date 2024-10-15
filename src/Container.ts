import { container } from 'tsyringe';

import { ExampleDatabase } from '@/example/infrastructure/example.database';
import type { ExampleRepository } from '@/example/repositories/example.repository';
import { ExampleMock } from '__tests__/__mocks__/example.database';

if (process.env.NODE_ENV === 'development') {
    container.register<ExampleRepository>('ExampleRepository', ExampleMock);
} else {
    container.register<ExampleRepository>('ExampleRepository', ExampleDatabase);
}

export const Container = container;
