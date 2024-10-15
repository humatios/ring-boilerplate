import { HttpError } from './errors';
const HTTP_400 = 400;

export class HttpResponse {
    static send(dataResponse: any, httpCode?: number) {
        return {
            statusCode: httpCode || HTTP_400,
            body: JSON.stringify(dataResponse),
        };
    }

    static error(error: unknown) {
        return HttpError.toHTTPResponse(error);
    }
}
