import { useSession } from 'next-auth/react';
import useSpotify from '../lib/useSpotify';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSonginfo from '../lib/useSonginfo'
import { useState } from 'react';
import { VolumeUpIcon as VolumeDownIcon} from '@heroicons/react/outline';
import { RewindIcon , FastForwardIcon , PauseIcon , PlayIcon , ReplyIcon , VolumeUpIcon , SwitchHorizontalIcon } from '@heroicons/react/solid';
import { useEffect , useCallback } from 'react';
import { debounce } from 'lodash';


function Player() {
  const spotifyApi = useSpotify();
  const {data : session} = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  const songInfo = useSonginfo();
  
  const fetchCurrentSong = () => {
      if(!songInfo){
        spotifyApi.getMyCurrentPlayingTrack().then((data)=>{
            console.log("Now playing",data.body?.item);
            setCurrentTrackId(data.body?.item?.id)

            spotifyApi.getMyCurrentPlaybackState().then((data)=>{
              setIsPlaying(data.body?.is_playing)
            })
        })
    }
  }

  useEffect(() => {
    if(spotifyApi.getAccessToken() && !currentTrackId)
    {
          fetchCurrentSong();
          setVolume(50);
    }
  
  }, [currentTrackIdState , spotifyApi , session])
  

  function handlePlayPause(){
      spotifyApi.getMyCurrentPlaybackState().then((data)=>{
        if(data.body.is_playing){
          spotifyApi.pause();
          setIsPlaying(false);
        }else{
          spotifyApi.play();
          setIsPlaying(true);
        }
      }) 
  }
  useEffect(() => {
     if(volume>0 && volume<=100){
       debouncedAdjustVolume(volume);
     }
  
   
  }, [volume]);

  const debouncedAdjustVolume = useCallback(
    debounce((volume)=>{
      spotifyApi.setVolume(volume).catch((err)=>{})
    },500,),[]
  )
  




  return (
    <div className='h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
      {/* <Left> */}
      <div className='flex items-center space-x-4'>
            <img className='hidden md:inline h-10 w-10' src={songInfo?.album.images?.[0]?.url} alt="" />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
    

    {/* <Center> */}
      <div className='flex items-center justify-evenly'>
        <SwitchHorizontalIcon className='btn'/>
        <RewindIcon className='btn'/>
        {isPlaying ? (
            <PauseIcon onClick = {handlePlayPause} className='btn h-10 w-10'/>
        ):(
            <PlayIcon  onClick = {handlePlayPause} className=' btn h-10 w-10'/>
        )}
        <FastForwardIcon className='btn'/>
        <ReplyIcon className='btn'/>
        </div>
      {/* <Right> */}
      <div className='flex items-center justify-end space-x-3 md:space-x-4 pr-5'>
        <VolumeDownIcon onClick={()=>{
          volume > 0 && setVolume(volume-10)
        }} className='btn'/>
        <input className='w-14 md:w-28' 
        type="range" 
        value={volume}
        onChange={(e)=>setVolume(Number(e.target.volume))} 
        min={0} max={100}
        />
        <VolumeUpIcon onClick={()=>{
          volume < 100 && setVolume(volume+10)
        }} className='btn'/>
      </div>
    </div>
  )
 
}

export default Player