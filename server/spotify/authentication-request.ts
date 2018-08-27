import {RequestBuilder} from './request-builder';

const DEFAULT_HOST = 'accounts.spotify.com',
    DEFAULT_PORT = 443,
    DEFAULT_SCHEME = 'https';

//
// var Request = require('./base-request');

export function AuthenticationRequest() {
    return new RequestBuilder()
        .withHost(DEFAULT_HOST)
        .withPort(DEFAULT_PORT)
        .withScheme(DEFAULT_SCHEME);
}

