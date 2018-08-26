"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var api_1 = require("./api/api");
var apiErrorHandler_1 = require("./api/apiErrorHandler");
var app = express();
api_1.initRestApi(app);
app.use(apiErrorHandler_1.apiErrorHandler)
    .use(cors());
app.listen(8090, function () {
    console.log('Server is running');
});
//# sourceMappingURL=server.js.map