export class Request {

    host: any;
    port: any;
    scheme: any;
    queryParameters: any;
    bodyParameters: any;
    headers: any;
    path: any;

    constructor(builder: any) {
        if (!builder) {
            throw new Error('No builder supplied to constructor');
        }

        this.host = builder.host;
        this.port = builder.port;
        this.scheme = builder.scheme;
        this.queryParameters = builder.queryParameters;
        this.bodyParameters = builder.bodyParameters;
        this.headers = builder.headers;
        this.path = builder.path;
    }

    getHost() {
        return this.host;
    };

    getPort() {
        return this.port;
    };

    getScheme() {
        return this.scheme;
    };

    getPath() {
        return this.path;
    };

    getQueryParameters() {
        return this.queryParameters;
    };

    getBodyParametersfunction() {
        return this.bodyParameters;
    };

    getHeadersfunction() {
        return this.headers;
    };

    getURI() {
        if (!this.scheme || !this.host || !this.port) {
            throw new Error('Missing components necessary to construct URI');
        }
        let uri = this.scheme + '://' + this.host;
        if (this.scheme === 'http' && this.port !== 80 ||
            this.scheme === 'https' && this.port !== 443) {
            uri += ':' + this.port;
        }
        if (this.path) {
            uri += this.path;
        }
        return uri;
    };

    getURL() {
        let uri = this.getURI();
        if (this.getQueryParameters()) {
            return uri + this.getQueryParameterString();
        } else {
            return uri;
        }
    };

    addQueryParameters(queryParameters: any) {
        for (let key in queryParameters) {
            this.addQueryParameter(key, queryParameters[key]);
        }
    };

    addQueryParameter(key: any, value: any) {
        if (!this.queryParameters) {
            this.queryParameters = {};
        }
        this.queryParameters[key] = value;
    };

    addBodyParameters(bodyParameters: any) {
        for (let key in bodyParameters) {
            this.addBodyParameter(key, bodyParameters[key]);
        }
    };

    addBodyParameter(key: any, value: any) {
        if (!this.bodyParameters) {
            this.bodyParameters = {};
        }
        this.bodyParameters[key] = value;
    };

    addHeaders(headers: any) {
        if (!this.headers) {
            this.headers = headers;
        } else {
            for (let key in headers) {
                this.headers[key] = headers[key];
            }
        }
    };

    getQueryParameterString() {
        let queryParameters = this.getQueryParameters();
        if (!queryParameters) {
            return;
        }
        let queryParameterString = '?';
        let first = true;
        for (let key in queryParameters) {
            if (queryParameters.hasOwnProperty(key)) {
                if (!first) {
                    queryParameterString += '&';
                } else {
                    first = false;
                }
                queryParameterString += key + '=' + queryParameters[key];
            }
        }
        return queryParameterString;
    };
}

