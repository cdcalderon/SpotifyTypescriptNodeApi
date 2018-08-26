"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var api_1 = require("./api/api");
var app = express();
api_1.initRestApi(app);
app.listen(8090, function () {
    console.log('Server is running');
});
//# sourceMappingURL=server.js.map