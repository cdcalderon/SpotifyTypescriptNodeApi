import {Application} from 'express';
import {apiGetAllSongs} from "./apiSongs";

export function initRestApi(app: Application) {
    app.route('/api/songs').get(apiGetAllSongs);
}