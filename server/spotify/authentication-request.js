"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request_builder_1 = require("./request-builder");
var DEFAULT_HOST = 'accounts.spotify.com', DEFAULT_PORT = 443, DEFAULT_SCHEME = 'https';
//
// var Request = require('./base-request');
function AuthenticationRequest() {
    return new request_builder_1.RequestBuilder()
        .withHost(DEFAULT_HOST)
        .withPort(DEFAULT_PORT)
        .withScheme(DEFAULT_SCHEME);
}
exports.AuthenticationRequest = AuthenticationRequest;
//# sourceMappingURL=authentication-request.js.map