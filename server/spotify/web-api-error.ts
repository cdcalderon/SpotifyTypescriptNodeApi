
export class WebApiError {
    name: any;
    message: any;
    statusCode: any;
    constructor(message: any, statusCode?: any) {

    }
}

// function WebapiError(message, statusCode) {
//     this.name = 'WebapiError';
//     this.message = (message || '');
//     this.statusCode = statusCode;
// }

// WebapiError.prototype = Error.prototype;
//
// module.exports = WebapiError;