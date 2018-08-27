"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request_builder_1 = require("./request-builder");
var DEFAULT_HOST = 'api.spotify.com', DEFAULT_PORT = 443, DEFAULT_SCHEME = 'https';
//
// var Request = require('./base-request');
function WebApiRequest() {
    return new request_builder_1.RequestBuilder()
        .withHost(DEFAULT_HOST)
        .withPort(DEFAULT_PORT)
        .withScheme(DEFAULT_SCHEME);
}
exports.WebApiRequest = WebApiRequest;
//# sourceMappingURL=spotify-web-api-request.js.map