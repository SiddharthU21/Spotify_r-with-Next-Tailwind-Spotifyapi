
import { useState , useEffect} from 'react'
import { useRecoilState } from 'recoil';
import { currentTrackIdState } from '../atoms/songAtom';
import useSpotify from './useSpotify';

function useSonginfo() {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [songInfo, setSongInfo] = useState(null);

  
  useEffect(() => {
    const fetchSonginfo = async() =>{
        if(currentTrackId){
            const trackInfo = await fetch(
                `https://api.spotify.com/v1/tracks/${currentTrackId}`,
                {
                    headers : {
                        Authorization : `Bearer ${spotifyApi.getAccessToken()}`,
                    }
                }
            ).then(res => res.json());

            setSongInfo(trackInfo);
        }
    }
        fetchSonginfo();
  }, [currentTrackId , spotifyApi])
  
  return songInfo;

  
}

export default useSonginfo