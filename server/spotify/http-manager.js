"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var web_api_error_1 = require("./web-api-error");
var superagent = require("superagent");
var HttpManager = /** @class */ (function () {
    function HttpManager() {
    }
    /* Create superagent options from the base request */
    HttpManager.getParametersFromRequest = function (request) {
        var options = {};
        if (request.getQueryParameters()) {
            options.query = request.getQueryParameters();
        }
        if (request.getHeaders() &&
            request.getHeaders()['Content-Type'] === 'application/json') {
            options.data = JSON.stringify(request.getBodyParameters());
        }
        else if (request.getBodyParameters()) {
            options.data = request.getBodyParameters();
        }
        if (request.getHeaders()) {
            options.headers = request.getHeaders();
        }
        return options;
    };
    /* Create an error object from an error returned from the Web API */
    HttpManager.prototype.getErrorObject = function (defaultMessage, err) {
        var errorObject;
        if (typeof err.error === 'object' && typeof err.error.message === 'string') {
            // Web API Error format
            errorObject = new web_api_error_1.WebApiError(err.error.message, err.error.status);
        }
        else if (typeof err.error === 'string') {
            // Authorization Error format
            /* jshint ignore:start */
            errorObject = new web_api_error_1.WebApiError(err.error + ': ' + err['error_description']);
            /* jshint ignore:end */
        }
        else if (typeof err === 'string') {
            // Serialized JSON error
            try {
                var parsedError = JSON.parse(err);
                errorObject = new web_api_error_1.WebApiError(parsedError.error.message, parsedError.error.status);
            }
            catch (err) {
                // Error not JSON formatted
            }
        }
        if (!errorObject) {
            // Unexpected format
            errorObject = new web_api_error_1.WebApiError(defaultMessage + ': ' + JSON.stringify(err));
        }
        return errorObject;
    };
    ;
    /**
     * Make a HTTP GET request.
     * @param {BaseRequest} The request.
     * @param {Function} The callback function.
     */
    HttpManager.get = function (request, callback) {
        var options = this.getParametersFromRequest(request);
        var method = superagent.get;
        this.makeRequest(method, options, request.getURI(), callback);
    };
    ;
    /**
     * Make a HTTP POST request.
     * @param {BaseRequest} The request.
     * @param {Function} The callback function.
     */
    HttpManager.prototype.post = function (request, callback) {
        var options = HttpManager.getParametersFromRequest(request);
        var method = superagent.post;
        HttpManager.makeRequest(method, options, request.getURI(), callback);
    };
    ;
    /**
     * Make a HTTP DELETE request.
     * @param {BaseRequest} The request.
     * @param {Function} The callback function.
     */
    HttpManager.prototype.del = function (request, callback) {
        var options = HttpManager.getParametersFromRequest(request);
        var method = superagent.del;
        HttpManager.makeRequest(method, options, request.getURI(), callback);
    };
    ;
    /**
     * Make a HTTP PUT request.
     * @param {BaseRequest} The request.
     * @param {Function} The callback function.
     */
    HttpManager.prototype.put = function (request, callback) {
        var options = HttpManager.getParametersFromRequest(request);
        var method = superagent.put;
        HttpManager.makeRequest(method, options, request.getURI(), callback);
    };
    ;
    /* Make the request to the Web API */
    HttpManager.makeRequest = function (method, options, uri, callback) {
        var req = method(uri);
        if (options.query) {
            req.query(options.query);
        }
        if (options.data && (!options.headers || options.headers['Content-Type'] !== 'application/json')) {
            req.type('form');
            req.send(options.data);
        }
        else if (options.data) {
            req.send(options.data);
        }
        if (options.headers) {
            req.set(options.headers);
        }
        req.end(function (err, response) {
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
    return HttpManager;
}());
exports.HttpManager = HttpManager;
//# sourceMappingURL=http-manager.js.map