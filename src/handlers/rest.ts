import 'reflect-metadata';
import '@/example/api/example.controller';

import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpRouterHandler from '@middy/http-router';

import { exampleRoutes } from '@/example/api/example.route';

export const handler = middy()
    .use(httpJsonBodyParser({ disableContentTypeError: true }))
    .use(httpErrorHandler())
    .handler(httpRouterHandler([...exampleRoutes]));
