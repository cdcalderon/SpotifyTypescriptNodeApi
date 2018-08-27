"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var querystring = require("querystring");
var request = require("request");
var api_1 = require("./api/api");
var apiErrorHandler_1 = require("./api/apiErrorHandler");
var apiPlaylist_1 = require("./api/apiPlaylist");
var app = express();
app.use(apiErrorHandler_1.apiErrorHandler)
    .use(cors())
    .use(cookieParser());
var client_id = '6cb9583b66514ef19a8ef0e57dad9b96'; // Your client id
var client_secret = 'fa09d198cc3c404b86f821e45c3b99c4'; // Your secret
var redirect_uri = 'http://localhost:8090/callback'; // Your redirect uri
var stateKey = 'spotify_auth_state';
var settings = { apiBase: 'https://api.spotify.com/v1' };
var spotifyPlayListApi = new apiPlaylist_1.SpotifyPlaylistApi();
api_1.initRestApi(app);
var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
app.get('/api/login', function (req, res) {
    var state = generateRandomString(16);
    res.cookie(stateKey, state);
    // your application requests authorization
    var scope = 'user-read-private user-read-email playlist-modify';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});
app.get('/callback', function (req, res) {
    // your application requests refresh and access tokens
    // after checking the state parameter
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;
    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    }
    else {
        res.clearCookie(stateKey);
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };
        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var access_token = body.access_token, refresh_token = body.refresh_token;
                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };
                // use the access token to access the Spotify Web API
                request.get(options, function (error, response, body) {
                    console.log(body);
                });
                // we can also pass the token to the browser to make requests from there
                res.redirect('/#' +
                    querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token
                    }));
            }
            else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }
});
// app.get('/playlists', function(req, res){
//
// });
app.get('/refresh_token', function (req, res) {
    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };
    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
    });
});
app.get('/api/playlists', function (req, res) {
    var playlists = [];
    spotifyPlayListApi.getUserPlaylists('cdcalderon2', {
        limit: 50,
        offset: 0
    }).then(function (r) {
        res.status(200).json({ message: 'Hello Worlds}' });
    });
});
app.listen(8090, function () {
    console.log('Server is running ', 8090);
});
// spotifyApi.getUserPlaylists(userID, {
//     limit: 50,
//     offset: playlists.length
// }).then(
//# sourceMappingURL=server.js.map