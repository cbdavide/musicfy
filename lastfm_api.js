
const dotenv = require('dotenv');
const path = require('path');

const request = require('request-promise');

const ENV_FILE = path.join(__dirname, '.env');
dotenv.config({ path: ENV_FILE });

const LAST_FM_KEY = process.env.LAST_FM_KEY;
const LAST_FM_API = 'https://ws.audioscrobbler.com/2.0/'

function recommentadion(name) {
    var options = {
        uri: LAST_FM_API,
        qs: {
            method: 'artist.getsimilar',
            artist: name,
            api_key: LAST_FM_KEY,
            format: 'json'
        },
        json: true
    };
    return request(options)
        .then(data => {
            let best_artists = data.similarartists.artist[0]
            let {name, url} = best_artists;
            let response = {name: name, url: url}

            return Promise.resolve(response)
        })
}

function best_of(name) {
    var options = {
        uri: LAST_FM_API,
        qs: {
            method: 'artist.gettopalbums',
            artist: name,
            api_key: LAST_FM_KEY,
            format: 'json'
        },
        json: true
    };
    return request(options)
        .then(data => {
            let top_albums = data.topalbums.album[0];
            let {name, url} = top_albums;

            let response = {name: name, url: url}
            return Promise.resolve(response)
        })
}

exports.best_of = best_of;
exports.recommentadion = recommentadion;
