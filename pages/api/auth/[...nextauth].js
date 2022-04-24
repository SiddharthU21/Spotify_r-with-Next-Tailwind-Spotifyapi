import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi ,  { LOGIN_URL } from '../../../lib/spotifyApi';

const refreshAccessToken = async(token) =>{
  try{
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const {body : refreshedToken} = await spotifyApi.refreshAccessToken();
    console.log('refreshed token is ',refreshedToken);

    return{
      ...token,
      accessToken : refreshedToken.access_token,
      accessTokenExpires : Date.now() + refreshedToken.expires_in * 1000,
      //this means if something happens to spotify api response token then it will revert back to our old refresh token 
      //also refreh token doesn't expire in a time limit but we have still kept this option if for some reason spotify has some errors 
      refreshToken : refreshedToken.refresh_token ?? token.refreshToken,
    }
  }catch(error){

    console.error();

    return{
      ...token,
      error : 'RefreshAccessTokenError',
    };

  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret : process.env.JWT_SECRET,
  pages : {
    signIn : '/login',
  },
  callbacks : {
    async jwt({token, account , user}){
      //intial signin
      if(account && user){
        return{
          ...token,
          accessToken : account.access_token,
          refreshToken : account.refresh_token,
          username : account.providerAccountId,
          accessTokenExpires : account.expires_at * 1000,
          //as the access token expires every hour and we get that in seconds so we convert it into milliseconds
        };
      }

      //return previous token if accesstoken not expired yet
      if(Date.now() < token.accessTokenExpires){
        console.log('existing token still valid');
        return token;
      }

      //access token has expired so refresh it with our funcn
      console.log('access token has expired');
      return await refreshAccessToken(token);
    },

    async session({session,token}){

        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.username = token.username;

        return session;
    }
  },
});
