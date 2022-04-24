import { ChevronDownIcon } from '@heroicons/react/outline';
import { useSession , signOut } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { shuffle } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState} from '../atoms/playlistAtom';
import useSpotify from '../lib/useSpotify';
import Songs from './Songs';



const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
];

function Body() {

 
  const [color, setColor] = useState(null);
  //instead of Recoil State we can use Recoil value to just use the read only value so that we dont need a setter to change it 
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState)
  const spotifyApi = useSpotify();
  const {data : session} = useSession();


  useEffect(() => { 
    setColor(shuffle(colors).pop()); 
  }, [playlistId]) 


  useEffect(() => { 
     spotifyApi.getPlaylist(playlistId).then((data)=>{
        setPlaylist(data.body)
      }).catch((err)=>console.log('Something went worng !' , err));
    
  }, [playlistId,spotifyApi])

  
  

  return (
    <div className='flex-grow text-white h-screen overflow-y-scroll scrollbar-hide'>
       <header className='absolute top-5 right-8' onClick={()=>{   
          signOut();
       }}>
          <div className='flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'>
            <img className='h-10 w-10 rounded-full' src={session?.user?.image} alt=''/>
            <h2>{session?.user.name}</h2>
            <ChevronDownIcon className='h-5 w-5'/>
          </div>
       </header>

       <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>

          <img className="shadow-2xl h-44 w-44" src={playlist?.images[0]?.url}/>
          <div>
            <p>PLAYLIST</p>
            <h1 className='text-2xl md:text-3xl xl:text-5xl font-bold'>{playlist?.name}</h1>
          </div>
       </section>
          <div className='p-8'>
           <Songs/>
         </div>
    </div>
  )
}

export default Body

