import {WebApiError} from './web-api-error';
import * as superagent from 'superagent';

export class HttpManager {
    /* Create superagent options from the base request */
    public static getParametersFromRequest(request: any) {

        var options: any = {};

        if (request.getQueryParameters()) {
            options.query = request.getQueryParameters();
        }

        if (request.getHeaders() &&
            request.getHeaders()['Content-Type'] === 'application/json') {
            options.data = JSON.stringify(request.getBodyParameters());
        } else if (request.getBodyParameters()) {
            options.data = request.getBodyParameters();
        }

        if (request.getHeaders()) {
            options.headers = request.getHeaders();
        }
        return options;
    }

    /* Create an error object from an error returned from the Web API */
    getErrorObject(defaultMessage: any, err: any) {
        var errorObject;
        if (typeof err.error === 'object' && typeof err.error.message === 'string') {
            // Web API Error format
            errorObject = new WebApiError(err.error.message, err.error.status);
        } else if (typeof err.error === 'string') {
            // Authorization Error format
            /* jshint ignore:start */
            errorObject = new WebApiError(err.error + ': ' + err['error_description']);
            /* jshint ignore:end */
        } else if (typeof err === 'string') {
            // Serialized JSON error
            try {
                var parsedError = JSON.parse(err);
                errorObject = new WebApiError(parsedError.error.message, parsedError.error.status);
            } catch (err) {
                // Error not JSON formatted
            }
        }

        if(!errorObject) {
            // Unexpected format
            errorObject = new WebApiError(defaultMessage + ': ' + JSON.stringify(err));
        }

        return errorObject;
    };

    /* Make the request to the Web API */
    public static makeRequest = function(method: any, options: any, uri: any, callback: any) {
        var req = method(uri);

        if (options.query) {
            req.query(options.query);
        }

        if (options.data && (!options.headers || options.headers['Content-Type'] !== 'application/json')) {
            req.type('form');
            req.send(options.data);
        } else if (options.data) {
            req.send(options.data);
        }

        if (options.headers) {
            req.set(options.headers);
        }

        req.end(function (err: any, response: any) {
            if (err) {
                var errorObject = this.getErrorObject('Request error', {
                    error: err
                });
                return callback(errorObject);
            }

            return callback(null, {
                body: response.body,
                headers: response.headers,
                statusCode: response.statusCode
            });
        });
    };

    /**
     * Make a HTTP GET request.
     * @param {BaseRequest} The request.
     * @param {Function} The callback function.
     */
    public static get(request: any, callback: any) {
        var options = this.getParametersFromRequest(request);
        var method = superagent.get;

        this.makeRequest(method, options, request.getURI(), callback);
    };

    /**
     * Make a HTTP POST request.
     * @param {BaseRequest} The request.
     * @param {Function} The callback function.
     */
    post(request: any, callback: any) {

        var options = HttpManager.getParametersFromRequest(request);
        var method = superagent.post;

        HttpManager.makeRequest(method, options, request.getURI(), callback);
    };

    /**
     * Make a HTTP DELETE request.
     * @param {BaseRequest} The request.
     * @param {Function} The callback function.
     */
    del(request: any, callback: any) {

        var options = HttpManager.getParametersFromRequest(request);
        var method = superagent.del;

        HttpManager.makeRequest(method, options, request.getURI(), callback);
    };

    /**
     * Make a HTTP PUT request.
     * @param {BaseRequest} The request.
     * @param {Function} The callback function.
     */
    put(request: any, callback: any) {

        var options = HttpManager.getParametersFromRequest(request);
        var method = superagent.put;

        HttpManager.makeRequest(method, options, request.getURI(), callback);
    };
}