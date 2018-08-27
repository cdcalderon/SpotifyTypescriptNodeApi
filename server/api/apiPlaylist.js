"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var spotify_web_api_request_1 = require("../spotify/spotify-web-api-request");
var http_manager_1 = require("../spotify/http-manager");
/**
 * Get a playlist.
 * @param {string} userId The playlist's owner's user ID.
 * @param {string} playlistId The playlist's ID.
 * @param {Object} [options] The options supplied to this request.
 * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
 * @example getPlaylist('thelinmichael', '3EsfV6XzCHU8SPNdbnFogK').then(...)
 * @returns {Promise|undefined} A promise that if successful, resolves to an object containing
 *          the playlist. If rejected, it contains an error object. Not returned if a callback is given.
 */
var SpotifyPlaylistApi = /** @class */ (function () {
    function SpotifyPlaylistApi() {
    }
    SpotifyPlaylistApi.prototype.getPlaylist = function (userId, playlistId, options, callback) {
        var request = spotify_web_api_request_1.WebApiRequest()
            .withPath('/v1/users/' + encodeURIComponent(userId) + '/playlists/' + playlistId)
            .build();
        this.addAccessToken(request, this.getAccessToken());
        this.addQueryParameters(request, options);
        var promise = this.performRequest(http_manager_1.HttpManager.get, request);
        if (callback) {
            promise.then(function (data) {
                callback(null, data);
            }, function (err) {
                callback(err);
            });
        }
        else {
            return promise;
        }
    };
    /**
     * Get a user's playlists.
     * @param {string} userId An optional id of the user. If you know the Spotify URI it is easy
     * to find the id (e.g. spotify:user:<here_is_the_id>). If not provided, the id of the user that granted
     * the permissions will be used.
     * @param {Object} [options] The options supplied to this request.
     * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
     * @example getUserPlaylists('thelinmichael').then(...)
     * @returns {Promise|undefined} A promise that if successful, resolves to an object containing
     *          a list of playlists. If rejected, it contains an error object. Not returned if a callback is given.
     */
    SpotifyPlaylistApi.prototype.getUserPlaylists = function (userId, options, callback) {
        var path;
        if (typeof userId === 'string') {
            path = '/v1/users/' + encodeURIComponent(userId) + '/playlists';
        }
        else {
            path = '/v1/me/playlists';
        }
        var request = spotify_web_api_request_1.WebApiRequest()
            .withPath(path)
            .build();
        this.addAccessToken(request, 
        // this.getAccessToken()
        "BQAFZRmTE8d0S3KM3oBCNAu0JY3ucHryxhdDGF-qUNlKGde52d5u-gwyw_xoCxsVifuJWM3BBKS-MhuxSfo");
        this.addQueryParameters(request, options);
        var promise = this.performRequest(http_manager_1.HttpManager.get, request);
        promise.then(function (data) {
            callback(null, data);
        }, function (err) {
            callback(err);
        });
        // if (callback) {
        //     promise.then(function(data) {
        //         callback(null, data);
        //     }, function(err) {
        //         callback(err);
        //     });
        // } else {
        //     return promise;
        // }
    };
    SpotifyPlaylistApi.prototype.addAccessToken = function (request, accessToken) {
        if (accessToken) {
            request.addHeaders({
                'Authorization': 'Bearer ' + accessToken
            });
        }
    };
    SpotifyPlaylistApi.prototype.getAccessToken = function () {
        return this.getCredential('accessToken');
    };
    SpotifyPlaylistApi.prototype.getCredential = function (credentialKey) {
        if (!this.credentials) {
            return;
        }
        else {
            return this.credentials[credentialKey];
        }
    };
    SpotifyPlaylistApi.prototype.addQueryParameters = function (request, options) {
        if (!options) {
            return;
        }
        for (var key in options) {
            if (key !== 'credentials') {
                request.addQueryParameter(key, options[key]);
            }
        }
    };
    SpotifyPlaylistApi.prototype.performRequest = function (method, request) {
        var promiseFunction = function (resolve, reject) {
            method(request, function (error, result) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        };
        return new Promise(promiseFunction);
    };
    return SpotifyPlaylistApi;
}());
exports.SpotifyPlaylistApi = SpotifyPlaylistApi;
//# sourceMappingURL=apiPlaylist.js.map