import * as express from 'express';
import {Application} from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as querystring from 'querystring';
import * as request from 'request';
import {initRestApi} from './api/api';
import {apiErrorHandler} from './api/apiErrorHandler';
import {SpotifyPlaylistApi} from './api/apiPlaylist';

const app: Application = express();

app.use(apiErrorHandler)
    .use(cors())
    .use(cookieParser());

const client_id = '6cb9583b66514ef19a8ef0e57dad9b96'; // Your client id
const client_secret = 'fa09d198cc3c404b86f821e45c3b99c4'; // Your secret
const redirect_uri = 'http://localhost:8090/callback'; // Your redirect uri

const stateKey = 'spotify_auth_state';
let settings = {apiBase:'https://api.spotify.com/v1'};

const spotifyPlayListApi = new SpotifyPlaylistApi();

initRestApi(app);

const generateRandomString = function(length: number) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

app.get('/api/login', function(req, res) {

    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    const scope = 'user-read-private user-read-email playlist-modify';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});

app.get('/callback', function(req, res) {

    // your application requests refresh and access tokens
    // after checking the state parameter

    let code = req.query.code || null;
    let state = req.query.state || null;
    let storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(stateKey);
        let authOptions = {
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

        request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {


                let access_token = body.access_token,
                    refresh_token = body.refresh_token;

                let options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };

                // use the access token to access the Spotify Web API
                request.get(options, function(error, response, body) {
                    console.log(body);
                });

                // we can also pass the token to the browser to make requests from there
                res.redirect('/#' +
                    querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token
                    }));
            } else {
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

app.get('/refresh_token', function(req, res) {

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

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
    });
});

app.get('/api/playlists', function (req, res) {
    let playlists = [];
    spotifyPlayListApi.getUserPlaylists(
        'cdcalderon2', {
            limit: 50,
            offset: 0
        }).then(function (r: any) {
        res.status(200).json({message: 'Hello Worlds}'});
    });

});

app.listen(8090, () => {
    console.log('Server is running ',8090 );
});


// spotifyApi.getUserPlaylists(userID, {
//     limit: 50,
//     offset: playlists.length
// }).then(
