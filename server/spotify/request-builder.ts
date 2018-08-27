import {Request} from "./base-request";

export class RequestBuilder{
    host: any;
    port: any;
    scheme: any;
    queryParameters: any;
    bodyParameters: any;
    headers: any;
    jsonBody: any;
    path: any;


    withHost(host: any) {
        this.host = host;
        return this;
    };

    withPort(port: any) {
        this.port = port;
        return this;
    };

    withScheme(scheme: any) {
        this.scheme = scheme;
        return this;
    };

    withQueryParameters(queryParameters: any) {
        this.queryParameters = queryParameters;
        return this;
    };

    withPath(path: any) {
        this.path = path;
        return this;
    };

    withBodyParameters(bodyParameters: any) {
        this.bodyParameters = bodyParameters;
        return this;
    };

    withHeaders(headers: any) {
        this.headers = headers;
        return this;
    };

    build() {
        return new Request(this);
    };
}

