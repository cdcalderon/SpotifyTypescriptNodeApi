import {Request, Response} from "express";
import {WebApiRequest} from '../spotify/spotify-web-api-request';
import {HttpManager} from '../spotify/http-manager';

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

export class SpotifyPlaylistApi{
    credentials:any;

    getPlaylist(userId: any, playlistId: any, options: any, callback: any) {
        var request = WebApiRequest()
            .withPath('/v1/users/' + encodeURIComponent(userId) + '/playlists/' + playlistId)
            .build();

        this.addAccessToken(request, this.getAccessToken());
        this.addQueryParameters(request, options);


        var promise = this.performRequest(HttpManager.get, request);

        if (callback) {
            promise.then(function(data) {
                callback(null, data);
            }, function(err) {
                callback(err);
            });
        } else {
            return promise;
        }
    }

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
    getUserPlaylists(userId: any, options: any, callback?: any): any {
        var path;
        if (typeof userId === 'string') {
            path = '/v1/users/' + encodeURIComponent(userId) + '/playlists';
        } else {
            path = '/v1/me/playlists';
        }

        var request = WebApiRequest()
            .withPath(path)
            .build();

        this.addAccessToken(request,
           // this.getAccessToken()
            "BQAFZRmTE8d0S3KM3oBCNAu0JY3ucHryxhdDGF-qUNlKGde52d5u-gwyw_xoCxsVifuJWM3BBKS-MhuxSfo"
        );
        this.addQueryParameters(request, options);

        var promise = this.performRequest(HttpManager.get, request);

        promise.then(function(data) {
            callback(null, data);
        }, function(err) {
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
    }


    addAccessToken(request: any, accessToken: any) {
        if (accessToken) {
            request.addHeaders({
                'Authorization' : 'Bearer ' + accessToken
            });
        }
    }

    getAccessToken() {
        return this.getCredential('accessToken');
    }

    getCredential(credentialKey: any) {
        if (!this.credentials) {
            return;
        } else {
            return this.credentials[credentialKey];
        }
    }

    addQueryParameters(request: any, options: any) {
        if (!options) {
            return;
        }
        for (var key in options) {
            if (key !== 'credentials') {
                request.addQueryParameter(key, options[key]);
            }
        }
    }

    performRequest(method: any, request: any) {
        var promiseFunction = function(resolve: any, reject: any) {
            method(request, function(error: any, result: any) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        };
        return new Promise(promiseFunction);
    }
}
