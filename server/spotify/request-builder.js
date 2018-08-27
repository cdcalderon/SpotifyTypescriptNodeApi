"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_request_1 = require("./base-request");
var RequestBuilder = /** @class */ (function () {
    function RequestBuilder() {
    }
    RequestBuilder.prototype.withHost = function (host) {
        this.host = host;
        return this;
    };
    ;
    RequestBuilder.prototype.withPort = function (port) {
        this.port = port;
        return this;
    };
    ;
    RequestBuilder.prototype.withScheme = function (scheme) {
        this.scheme = scheme;
        return this;
    };
    ;
    RequestBuilder.prototype.withQueryParameters = function (queryParameters) {
        this.queryParameters = queryParameters;
        return this;
    };
    ;
    RequestBuilder.prototype.withPath = function (path) {
        this.path = path;
        return this;
    };
    ;
    RequestBuilder.prototype.withBodyParameters = function (bodyParameters) {
        this.bodyParameters = bodyParameters;
        return this;
    };
    ;
    RequestBuilder.prototype.withHeaders = function (headers) {
        this.headers = headers;
        return this;
    };
    ;
    RequestBuilder.prototype.build = function () {
        return new base_request_1.Request(this);
    };
    ;
    return RequestBuilder;
}());
exports.RequestBuilder = RequestBuilder;
//# sourceMappingURL=request-builder.js.map