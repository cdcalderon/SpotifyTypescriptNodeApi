"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apiSongs_1 = require("./apiSongs");
function initRestApi(app) {
    app.route('/api/songs').get(apiSongs_1.apiGetAllSongs);
}
exports.initRestApi = initRestApi;
//# sourceMappingURL=api.js.map