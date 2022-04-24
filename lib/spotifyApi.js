import  SpotifyWebApi  from "spotify-web-api-node";

//scopes are basically all the end points 
const scopes = [
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-private',
    'user-read-email',
    'user-top-read',
    'user-follow-read',
    'user-read-recently-played',
    'user-read-currently-playing',
    'user-library-read',
    'streaming',
    'playlist-read-collaborative',
    'playlist-read-private',

].join(',');

const params = {
    scope: scopes,
};

//this urlsearchparams funcn helps to pinpoint which of the scopes we want for our purpose
const queryParamString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebApi({
    clientId : process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret : process.env.NEXT_PUBLIC_CLIENT_SECRET,
    
})

export default spotifyApi;
export { LOGIN_URL };