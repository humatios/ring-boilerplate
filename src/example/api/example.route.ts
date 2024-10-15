import { apiV1 } from '@/shared/api/generator';

import { ExampleController } from './example.controller';

export const exampleRoutes = apiV1('example', [
    {
        path: '/',
        method: 'POST',
        fn: ({ body }) => ExampleController.create(body),
    },
    {
        path: '/{id}',
        method: 'GET',
        fn: ({ paths }) => ExampleController.getOne(paths.id),
    },
]);
