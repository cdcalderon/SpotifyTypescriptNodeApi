"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Request = /** @class */ (function () {
    function Request(builder) {
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
    Request.prototype.getHost = function () {
        return this.host;
    };
    ;
    Request.prototype.getPort = function () {
        return this.port;
    };
    ;
    Request.prototype.getScheme = function () {
        return this.scheme;
    };
    ;
    Request.prototype.getPath = function () {
        return this.path;
    };
    ;
    Request.prototype.getQueryParameters = function () {
        return this.queryParameters;
    };
    ;
    Request.prototype.getBodyParametersfunction = function () {
        return this.bodyParameters;
    };
    ;
    Request.prototype.getHeadersfunction = function () {
        return this.headers;
    };
    ;
    Request.prototype.getURI = function () {
        if (!this.scheme || !this.host || !this.port) {
            throw new Error('Missing components necessary to construct URI');
        }
        var uri = this.scheme + '://' + this.host;
        if (this.scheme === 'http' && this.port !== 80 ||
            this.scheme === 'https' && this.port !== 443) {
            uri += ':' + this.port;
        }
        if (this.path) {
            uri += this.path;
        }
        return uri;
    };
    ;
    Request.prototype.getURL = function () {
        var uri = this.getURI();
        if (this.getQueryParameters()) {
            return uri + this.getQueryParameterString();
        }
        else {
            return uri;
        }
    };
    ;
    Request.prototype.addQueryParameters = function (queryParameters) {
        for (var key in queryParameters) {
            this.addQueryParameter(key, queryParameters[key]);
        }
    };
    ;
    Request.prototype.addQueryParameter = function (key, value) {
        if (!this.queryParameters) {
            this.queryParameters = {};
        }
        this.queryParameters[key] = value;
    };
    ;
    Request.prototype.addBodyParameters = function (bodyParameters) {
        for (var key in bodyParameters) {
            this.addBodyParameter(key, bodyParameters[key]);
        }
    };
    ;
    Request.prototype.addBodyParameter = function (key, value) {
        if (!this.bodyParameters) {
            this.bodyParameters = {};
        }
        this.bodyParameters[key] = value;
    };
    ;
    Request.prototype.addHeaders = function (headers) {
        if (!this.headers) {
            this.headers = headers;
        }
        else {
            for (var key in headers) {
                this.headers[key] = headers[key];
            }
        }
    };
    ;
    Request.prototype.getQueryParameterString = function () {
        var queryParameters = this.getQueryParameters();
        if (!queryParameters) {
            return;
        }
        var queryParameterString = '?';
        var first = true;
        for (var key in queryParameters) {
            if (queryParameters.hasOwnProperty(key)) {
                if (!first) {
                    queryParameterString += '&';
                }
                else {
                    first = false;
                }
                queryParameterString += key + '=' + queryParameters[key];
            }
        }
        return queryParameterString;
    };
    ;
    return Request;
}());
exports.Request = Request;
//# sourceMappingURL=base-request.js.map