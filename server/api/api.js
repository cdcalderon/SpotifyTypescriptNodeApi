"use strict";
exports.__esModule = true;
var apiSongs_1 = require("./apiSongs");
function initRestApi(app) {
    app.route('/api/songs').get(apiSongs_1.apiGetAllSongs);
}
exports.initRestApi = initRestApi;
