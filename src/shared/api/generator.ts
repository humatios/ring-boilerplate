import { HttpResponse } from '@/shared/http/response';

interface RoutesGenerator {
    path: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    fn: {
        ({
            body,
            paths,
            queries,
        }: {
            body: any;
            paths: Record<string, string>;
            queries?: Record<string, string>;
        }): any;
    };
}

export function apiV1(prefix: string, routes: RoutesGenerator[]) {
    return routes.map((route) => {
        const { path, method, fn } = route;
        return routesGenerator({
            path: `/v1/${prefix}${path}`,
            method,
            fn,
        });
    });
}

function routesGenerator({ path, method, fn }: RoutesGenerator): any {
    return {
        path,
        method,
        handler: async (request: any): Promise<any> => {
            try {
                const result = await fn({
                    body: request.body,
                    paths: request.pathParameters,
                    queries: request.queryStringParameters,
                });
                return HttpResponse.send(result, 200);
            } catch (error) {
                return HttpResponse.error(error);
            }
        },
    };
}
